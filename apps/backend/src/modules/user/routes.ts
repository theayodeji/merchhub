import { Router } from 'express';
import { getProfile, updateProfile, getCategories } from './controllers/user.controller';
import { requireAuth } from '../../middleware/requireAuth';

const router = Router();

// Public endpoint — no auth needed
router.get('/categories', getCategories);

// Protected endpoints — require authenticated user
router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile);

export { router as userRouter };
