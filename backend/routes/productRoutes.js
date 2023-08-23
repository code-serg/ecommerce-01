import express from 'express';
import { 
  getProducts, 
  getProductById,
  getTopProducts,
  createProduct, 
  updateProduct, 
  deleteProduct,
  createProductReview,
} from '../controllers/productController.js';
import { authUser, authAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// /api/products - see backend/server.js
router
  .route('/').get(getProducts)
  .post(authUser, authAdmin, createProduct);
// "/top" goes above "/:id" so that is not treated as an id
router
  .route('/top')
  .get(getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .put(authUser, authAdmin, updateProduct)
  .delete(authUser, authAdmin, deleteProduct);
router
  .route('/:id/reviews')
  .post(authUser, createProductReview);

export default router;
