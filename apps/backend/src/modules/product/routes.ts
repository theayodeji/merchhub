import { Router } from 'express';
import { createProduct, getMyProducts } from './controllers/product.controller';
import { requireCreator } from '../../middleware/requireCreator';

const router = Router();

// All product management routes require the user to be a creator
router.use(requireCreator);

router.post('/', createProduct);
router.get('/me', getMyProducts);

export { router as productRouter };
