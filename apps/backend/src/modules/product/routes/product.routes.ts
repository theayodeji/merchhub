import { Router } from 'express';
import { requireAuth } from '../../../middleware/requireAuth';
import { requireCreator } from '../../../middleware/requireCreator';
import { upload } from '../../../middleware/upload';
import * as productController from '../controllers/product.controller';

const router = Router();


router.get('/categories', productController.getProductCategories);

// All product routes require a logged-in user who is a creator
router.use(requireAuth, requireCreator);

router.post('/', upload.array('images', 5), productController.createProduct);
router.get('/', productController.getMyProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', upload.array('images', 5), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
