import { Router } from 'express';
import * as storefrontController from '../controllers/storefront.controller';

const router = Router();

// Public routes - no authentication required
router.get('/creators/:username', storefrontController.getCreatorStorefront);
router.get('/products', storefrontController.getMarketplaceFeed);
router.get('/products/:id', storefrontController.getProductDetails);

export default router;
