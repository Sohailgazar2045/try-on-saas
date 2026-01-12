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

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
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

