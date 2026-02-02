import Stripe from 'stripe';
import prisma from '../utils/db.js';
import { SUBSCRIPTION_PLANS } from '../config/constants.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { plan, type } = req.body; // type: "credits" or "subscription"

    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let sessionConfig = {};

    if (type === 'subscription') {
      const selectedPlan = SUBSCRIPTION_PLANS[plan.toUpperCase()];
      if (!selectedPlan || !selectedPlan.stripePriceId) {
        return res.status(400).json({ message: 'Invalid subscription plan' });
      }

      sessionConfig = {
        mode: 'subscription',
        line_items: [
          {
            price: selectedPlan.stripePriceId,
            quantity: 1,
          },
        ],
        subscription_data: {
          metadata: {
            userId: req.userId,
            plan: plan,
            credits: selectedPlan.credits.toString()
          }
        }
      };
    } else {
      // Credit purchase
      const creditPackages = {
        small: { credits: 10, price: 4.99 },
        medium: { credits: 25, price: 9.99 },
        large: { credits: 50, price: 17.99 }
      };

      const creditPackage = creditPackages[plan];
      if (!creditPackage) {
        return res.status(400).json({ message: 'Invalid credit package' });
      }

      sessionConfig = {
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${creditPackage.credits} Credits`,
                description: 'Virtual Try-On Credits'
              },
              unit_amount: Math.round(creditPackage.price * 100)
            },
            quantity: 1
          }
        ],
        metadata: {
          userId: req.userId,
          type: 'credits',
          credits: creditPackage.credits.toString()
        }
      };
    }

    const session = await stripe.checkout.sessions.create({
      ...sessionConfig,
      customer_email: user.email,
      success_url: `${process.env.FRONTEND_URL}/billing?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/billing?canceled=true`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata?.userId;

      if (!userId) {
        console.error('No userId in session metadata');
        return res.status(400).json({ message: 'Invalid webhook data' });
      }

      if (session.mode === 'subscription') {
        // Handle subscription
        const credits = parseInt(session.metadata.credits) || 0;
        await prisma.user.update({
          where: { id: userId },
          data: {
            credits: { increment: credits },
            subscription: session.metadata.plan,
            stripeCustomerId: session.customer
          }
        });
      } else {
        // Handle one-time credit purchase
        const credits = parseInt(session.metadata.credits) || 0;
        await prisma.user.update({
          where: { id: userId },
          data: { credits: { increment: credits } }
        });

        // Record transaction
        await prisma.transaction.create({
          data: {
            userId,
            type: 'credit_purchase',
            amount: session.amount_total / 100,
            credits,
            stripePaymentId: session.payment_intent,
            status: 'completed'
          }
        });
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    next(error);
  }
};

export const getPricing = async (req, res) => {
  res.json({
    subscriptions: SUBSCRIPTION_PLANS,
    creditPackages: {
      small: { credits: 10, price: 4.99 },
      medium: { credits: 25, price: 9.99 },
      large: { credits: 50, price: 17.99 }
    }
  });
};

