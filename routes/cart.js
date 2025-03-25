import express from 'express';
import { addtoCart, getCart, removeCart } from '../controller/cartController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.post('/addtoCart/:productId', authenticate, restrict(['user']), addtoCart);
router.get('/getCart/:id', getCart);
router.delete('/removeCart/:id/:productId', authenticate, restrict(['user']), removeCart);

export default router;