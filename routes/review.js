import express from 'express';
import { createReview, getAllReview, getReview } from '../controller/reviewController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.post('/productReview/:productId', authenticate, restrict(['user']), createReview);
router.get('/getReview/:productId', getReview);
router.get('/getAllReview', getAllReview);

export default router;