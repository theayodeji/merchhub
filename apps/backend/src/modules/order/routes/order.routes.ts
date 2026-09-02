import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import { requireCreator } from '../../../middleware/requireCreator';
import { validateRequest } from '../../../middleware/validate';
import { createOrderSchema, updateOrderStatusSchema } from '@merchhub/shared';

const router = Router();

// Public route to place an order
router.post('/', validateRequest(createOrderSchema), orderController.placeOrder);

// Protected creator routes
router.get('/creator', requireCreator, orderController.getCreatorOrders);
router.patch('/creator/:id/status', requireCreator, orderController.updateOrderStatus);

export default router;
