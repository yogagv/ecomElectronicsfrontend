import express from 'express';
import { allUsers, profileDelete, profileUpdate, singleUser } from '../controller/userController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.get('/allUsers', authenticate, restrict(['admin']), allUsers);
router.get('/singleUser/:id', singleUser)
router.put('/profileUpdate/:id', profileUpdate);
router.delete('/profileDelete/:id', profileDelete);

export default router;