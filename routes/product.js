import express, { Router } from 'express';
import { addProduct, allProduct, deleteProduct, productByCategory, productByDiscount, productByName, singleProduct, updateProduct } from '../controller/productController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.post('/addproduct', authenticate, restrict(['admin']), addProduct);
router.get('/allProduct', allProduct);
router.get('/singleProduct/:id', singleProduct);
router.get('/productByName/:name', productByName);
router.get('/productByDiscount', productByDiscount);
router.get('/productByCategory/:category', productByCategory);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', authenticate, restrict(['admin']), deleteProduct);


export default router;