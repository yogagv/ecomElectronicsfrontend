import express from 'express';
import { getAllOrder, getOrder, productOrder } from '../controller/orderController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.post('/productOrder/:productId',authenticate, restrict(['user']), productOrder);
router.get('/allOrders', authenticate, restrict(['admin']), getAllOrder);
router.get('/getOrder/:id', getOrder);

export default router;