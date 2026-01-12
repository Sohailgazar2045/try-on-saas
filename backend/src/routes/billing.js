import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { createCheckoutSession, handleWebhook, getPricing } from '../controllers/billingController.js';

const router = express.Router();

// Webhook doesn't need auth (uses Stripe signature)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Other routes need authentication
router.get('/pricing', getPricing);
router.post('/checkout', authenticate, createCheckoutSession);

export default router;

