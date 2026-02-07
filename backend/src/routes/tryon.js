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
 *               $ref: '#/components/schemas/TryOnResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       402:
 *         $ref: '#/components/responses/InsufficientCreditsError'
 *       403:
 *         description: Not authorized to use these images
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: AI generation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/generate', authenticate, generateTryOnImage);

export default router;

