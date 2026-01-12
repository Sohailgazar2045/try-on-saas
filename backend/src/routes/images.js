import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { uploadSingle } from '../middlewares/upload.js';
import {
  uploadImage,
  getUserImages,
  deleteImage,
  saveGeneratedImage
} from '../controllers/imageController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/upload', uploadSingle, uploadImage);
router.get('/', getUserImages);
router.delete('/:id', deleteImage);
router.post('/save', saveGeneratedImage);

export default router;

