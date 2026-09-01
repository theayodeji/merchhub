import { Router } from 'express';
import { getProfile, updateProfile, getCategories, updateRole } from './controllers/user.controller';
import { requireAuth } from '../../middleware/requireAuth';
import { upload } from '../../middleware/upload';

const router = Router();

// Public endpoint — no auth needed
router.get('/categories', getCategories);

// Protected endpoints — require authenticated user
router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, upload.single('avatar'), updateProfile);
router.patch('/role', requireAuth, updateRole);

export { router as userRouter };
