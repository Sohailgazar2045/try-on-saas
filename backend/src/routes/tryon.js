import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { generateTryOnImage } from '../controllers/tryOnController.js';

const router = express.Router();

/**
 * @swagger
 * /api/tryon/generate:
 *   post:
 *     summary: Generate a try-on image
 *     tags: [Try-On]
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
 *               personImageId:
 *                 type: string
 *                 description: ID of the person/user image
 *               outfitImageId:
 *                 type: string
 *                 description: ID of the outfit image
 *             required: [personImageId, outfitImageId]
 *     responses:
 *       200:
 *         description: Try-on generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 image: { $ref: '#/components/schemas/Image' }
 *                 creditsRemaining: { type: integer }
 *       400:
 *         description: Invalid request
 *       402:
 *         description: Insufficient credits
 *       404:
 *         description: Image not found
 *       403:
 *         description: Not authorized
 */
router.post('/generate', authenticate, generateTryOnImage);

export default router;

