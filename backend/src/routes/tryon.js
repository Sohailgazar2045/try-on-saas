import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { generateTryOnImage } from '../controllers/tryOnController.js';

const router = express.Router();

router.use(authenticate);
router.post('/generate', generateTryOnImage);

export default router;

