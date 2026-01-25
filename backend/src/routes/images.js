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

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               type:
 *                 type: string
 *                 enum: [user, outfit]
 *             required: [image, type]
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 image: { $ref: '#/components/schemas/Image' }
 *       400:
 *         description: Invalid input
 */
router.post('/upload', authenticate, uploadSingle, uploadImage);

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Get all user images
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [user, outfit, generated]
 *         description: Filter by image type
 *     responses:
 *       200:
 *         description: List of user images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Image' }
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, getUserImages);

/**
 * @swagger
 * /api/images/{id}:
 *   delete:
 *     summary: Delete an image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Image ID
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       404:
 *         description: Image not found
 *       403:
 *         description: Not authorized
 */
router.delete('/:id', authenticate, deleteImage);

/**
 * @swagger
 * /api/images/save:
 *   post:
 *     summary: Save a generated image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *               metadata:
 *                 type: object
 *             required: [url]
 *     responses:
 *       201:
 *         description: Image saved successfully
 *       400:
 *         description: Invalid input
 */
router.post('/save', authenticate, saveGeneratedImage);

export default router;

