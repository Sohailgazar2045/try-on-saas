import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { getProfile, updateProfile, deleteAccount } from '../controllers/userController.js';

const router = express.Router();

router.use(authenticate);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/account', deleteAccount);

export default router;

