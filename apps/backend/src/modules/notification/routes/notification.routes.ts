import { Router } from 'express';
import { getNotifications, markAsRead } from '../controllers/notification.controller';
import { requireAuth } from '../../../middleware/requireAuth';

const router = Router();

router.use(requireAuth);

router.get('/', getNotifications);
router.patch('/:id/read', markAsRead);

export { router as notificationRouter };
