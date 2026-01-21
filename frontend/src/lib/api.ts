import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors – in this demo frontend we don't auto-redirect on 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// ---- Frontend-only / mocked Auth API ------------------------------------
// This lets you log in without running the backend by using hardcoded
// demo credentials and a fake profile.

type LoginPayload = { email: string; password: string };
type RegisterPayload = { email: string; password: string; name?: string };

const DEMO_EMAIL = 'demo@tryon.dev';
const DEMO_PASSWORD = 'Password123!';

const demoUser = {
  id: 'demo-user-1',
  name: 'Demo User',
  email: DEMO_EMAIL,
  credits: 42,
  subscription: 'Pro',
  createdAt: new Date().toISOString(),
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authAPI = {
  // Kept for API compatibility, but acts like a no-op that always succeeds
  register: async (_data: RegisterPayload) => {
    await delay(400);
    return {
      data: {
        user: demoUser,
        token: 'demo-token',
      },
    };
  },

  login: async (data: LoginPayload) => {
    await delay(400);

    const valid =
      data.email.trim().toLowerCase() === DEMO_EMAIL &&
      data.password === DEMO_PASSWORD;

    if (!valid) {
      return Promise.reject({
        response: {
          data: { message: 'Invalid demo credentials' },
        },
      });
    }

    // Persist a simple demo token so existing auth helpers keep working
    Cookies.set('token', 'demo-token', {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('demoUser', JSON.stringify(demoUser));
    }

    return {
      data: {
        user: demoUser,
        token: 'demo-token',
      },
    };
  },

  logout: async () => {
    await delay(200);
    Cookies.remove('token');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('demoUser');
    }
    return { data: { success: true } };
  },

  getProfile: async () => {
    await delay(200);

    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('demoUser');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return { data: { user: parsed } };
        } catch {
          // fall through to default demoUser
        }
      }
    }

    return {
      data: {
        user: demoUser,
      },
    };
  },
};

// Image API
export const imageAPI = {
  upload: (formData: FormData) =>
    api.post('/images/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getAll: (type?: string) =>
    api.get('/images', { params: type ? { type } : {} }),
  delete: (id: string) => api.delete(`/images/${id}`),
  save: (data: { url: string; cloudinaryId?: string; metadata?: any }) =>
    api.post('/images/save', data),
};

// Try-On API
export const tryOnAPI = {
  generate: (data: { personImageId: string; outfitImageId: string }) =>
    api.post('/tryon/generate', data),
};

// Billing API
export const billingAPI = {
  getPricing: () => api.get('/billing/pricing'),
  createCheckout: (data: { plan: string; type: 'credits' | 'subscription' }) =>
    api.post('/billing/checkout', data),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: { name?: string; email?: string; password?: string }) =>
    api.put('/user/profile', data),
  deleteAccount: () => api.delete('/user/account'),
};

export default api;

