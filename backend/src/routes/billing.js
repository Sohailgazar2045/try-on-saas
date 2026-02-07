import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { createCheckoutSession, handleWebhook, getPricing } from '../controllers/billingController.js';

const router = express.Router();

/**
 * @swagger
 * /api/billing/pricing:
 *   get:
 *     summary: Get pricing and plans
 *     tags: [Billing]
 *     responses:
 *       200:
 *         description: Pricing information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pricing'
 */
router.get('/pricing', getPricing);

/**
 * @swagger
 * /api/billing/checkout:
 *   post:
 *     summary: Create Stripe checkout session
 *     tags: [Billing]
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
 *               plan:
 *                 type: string
 *                 description: Plan name (e.g., 'basic', 'small')
 *               type:
 *                 type: string
 *                 enum: [subscription, credits]
 *             required: [plan, type]
 *     responses:
 *       200:
 *         description: Checkout session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId: { type: string }
 *                 url: { type: string }
 *       200:
 *         description: Checkout session created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckoutSession'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/checkout', authenticate, createCheckoutSession);

/**
 * @swagger
 * /api/billing/webhook:
 *   post:
 *     summary: Stripe webhook handler
 *     tags: [Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed
 *       400:
 *         description: Invalid signature
 */
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;

