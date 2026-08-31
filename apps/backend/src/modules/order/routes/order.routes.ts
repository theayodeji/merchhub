import { Router } from 'express';
import * as orderController from '../controllers/order.controller';

const router = Router();

// Public route to place an order
router.post('/', orderController.placeOrder);

export default router;
