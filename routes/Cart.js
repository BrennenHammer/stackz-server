import express from 'express';
import { addItemToCart, getCartItems } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add-to-cart', addItemToCart);
router.get('/cart/:userId', getCartItems);

export default router;