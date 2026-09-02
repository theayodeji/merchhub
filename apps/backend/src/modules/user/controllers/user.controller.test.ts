import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProfile, updateProfile, getCategories, updateRole } from './user.controller';
import { prisma } from '../../../lib/__mocks__/prisma';
import { getProfile as fetchProfile } from '../services/get-profile.service';
import { updateProfile as editProfile } from '../services/update-profile.service';
import { getCategories as fetchCategories } from '../services/get-categories.service';
import { storageService } from '../../../lib/storage';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../../errors/AppError';

vi.mock('../../../lib/prisma');
vi.mock('../services/get-profile.service');
vi.mock('../services/update-profile.service');
vi.mock('../services/get-categories.service');
vi.mock('../../../lib/storage', () => ({
  storageService: {
    getFileUrl: vi.fn((key) => `https://s3.amazonaws.com/${key}`),
    uploadFile: vi.fn(),
  },
}));

describe('User Controller', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    vi.clearAllMocks();
    req = { user: { id: 'user_1' }, body: {} };
    res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    };
  });

  describe('getProfile', () => {
    it('should return 404 if profile not found', async () => {
      vi.mocked(fetchProfile).mockResolvedValue(null);

      const next = vi.fn();
      await getProfile(req, res, next);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });

    it('should return profile and format image url', async () => {
      vi.mocked(fetchProfile).mockResolvedValue({ id: 'user_1', image: 'avatar.jpg' } as any);

      await getProfile(req, res, vi.fn());

      expect(res.json).toHaveBeenCalledWith({ id: 'user_1', image: 'https://s3.amazonaws.com/avatar.jpg' });
    });
  });

  describe('updateProfile', () => {
    it('should return 400 if username is taken', async () => {
      req.body = { username: 'taken' };
      prisma.user.findFirst.mockResolvedValue({ id: 'user_2' } as any);

      const next = vi.fn();
      await updateProfile(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
    });

    it('should update profile successfully', async () => {
      req.body = { bio: 'New bio' };
      vi.mocked(editProfile).mockResolvedValue({ id: 'user_1', bio: 'New bio', image: 'new.jpg' } as any);

      await updateProfile(req, res, vi.fn());

      expect(editProfile).toHaveBeenCalledWith('user_1', { bio: 'New bio' });
      expect(res.json).toHaveBeenCalledWith({ id: 'user_1', bio: 'New bio', image: 'https://s3.amazonaws.com/new.jpg' });
    });
  });

  describe('getCategories', () => {
    it('should return categories', async () => {
      vi.mocked(fetchCategories).mockResolvedValue([{ id: 'cat_1' }] as any);

      await getCategories(req, res, vi.fn());

      expect(res.json).toHaveBeenCalledWith([{ id: 'cat_1' }]);
    });
  });

  describe('updateRole', () => {
    it('should return 400 for invalid role', async () => {
      req.body = { role: 'ADMIN' };

      const next = vi.fn();
      await updateRole(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
    });

    it('should return 403 if trying to become creator without category', async () => {
      req.body = { role: 'CREATOR' };
      prisma.user.findUnique.mockResolvedValue({ creatorCategoryId: null } as any);

      const next = vi.fn();
      await updateRole(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    });

    it('should update role to CREATOR successfully', async () => {
      req.body = { role: 'CREATOR' };
      prisma.user.findUnique.mockResolvedValue({ creatorCategoryId: 'cat_1' } as any);
      prisma.user.update.mockResolvedValue({ id: 'user_1', role: 'CREATOR' } as any);

      await updateRole(req, res, vi.fn());

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user_1' },
        data: { role: 'CREATOR' }
      });
      expect(res.json).toHaveBeenCalledWith({ id: 'user_1', role: 'CREATOR' });
    });
  });
});
