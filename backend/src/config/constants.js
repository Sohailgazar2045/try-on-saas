export const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = (process.env.ALLOWED_IMAGE_TYPES || 'jpg,jpeg,png,webp').split(',');

export const CREDIT_COSTS = {
  TRY_ON: 1, // 1 credit per try-on generation
};

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    credits: 5,
    price: 0
  },
  BASIC: {
    name: 'Basic',
    credits: 50,
    price: 9.99,
    stripePriceId: process.env.STRIPE_BASIC_PRICE_ID
  },
  PREMIUM: {
    name: 'Premium',
    credits: 200,
    price: 29.99,
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID
  }
};

