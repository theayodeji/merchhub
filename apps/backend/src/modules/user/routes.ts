import { Router } from 'express';
import { getProfile, updateProfile, getCategories, updateRole } from './controllers/user.controller';
import { requireAuth } from '../../middleware/requireAuth';
import { upload } from '../../middleware/upload';
import { validateRequest } from '../../middleware/validate';
import { updateProfileSchema, updateRoleSchema } from '@merchhub/shared';

const router = Router();

// Public endpoint — no auth needed
router.get('/categories', getCategories);

// Protected endpoints — require authenticated user
router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, upload.single('avatar'), validateRequest(updateProfileSchema), updateProfile);
router.patch('/role', requireAuth, validateRequest(updateRoleSchema), updateRole);

export { router as userRouter };
