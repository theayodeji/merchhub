import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import { requireCreator } from '../../../middleware/requireCreator';
import { requireAuth } from '../../../middleware/requireAuth';
import { validateRequest } from '../../../middleware/validate';
import { createOrderSchema, updateOrderStatusSchema, verifyOrderSchema } from '@merchhub/shared';

const router = Router();

// Public route to place an order
router.post('/', validateRequest(createOrderSchema), orderController.placeOrder);

// Public route to verify and fetch an order by ID
router.post('/public/:id/verify', validateRequest(verifyOrderSchema), orderController.getPublicOrder);

// Protected authenticated routes
router.get('/my-orders', requireAuth, orderController.getMyOrders);

// Protected creator routes
router.get('/creator', requireCreator, orderController.getCreatorOrders);
router.get('/creator/:id', requireCreator, orderController.getCreatorOrder);
router.patch('/creator/:id/status', requireCreator, orderController.updateOrderStatus);

export default router;
