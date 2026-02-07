import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Type definitions
export interface Image {
  id: string;
  url: string;
  type: string;
  name?: string;
  size?: number;
  uploadedAt?: string;
  createdAt?: string;
}

export interface ImageUploadResponse {
  data: {
    image: Image;
  };
}

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
  upload: async (formData: FormData): Promise<ImageUploadResponse> => {
    try {
      // Try to upload to backend first
      const response = await api.post<{ image: Image }>('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return { data: response.data } as ImageUploadResponse;
    } catch (error) {
      // If backend fails, use demo mode
      await delay(500);
      
      const file = formData.get('image') as File;
      const type = formData.get('type') as string;
      
      if (!file) {
        return Promise.reject({
          response: { data: { message: 'No file provided' } },
        });
      }

      // Create a data URL from the file for demo purposes
      const reader = new FileReader();
      
      return new Promise<ImageUploadResponse>((resolve, reject) => {
        reader.onload = () => {
          const demoImage: Image = {
            id: `demo-img-${Date.now()}`,
            url: reader.result as string,
            type: type || 'general',
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toISOString(),
          };

          // Store in localStorage for persistence
          if (typeof window !== 'undefined') {
            const stored = window.localStorage.getItem('demoImages') || '[]';
            const images = JSON.parse(stored);
            images.push(demoImage);
            window.localStorage.setItem('demoImages', JSON.stringify(images));
          }

          resolve({
            data: { image: demoImage },
          });
        };

        reader.onerror = () => {
          reject({
            response: { data: { message: 'Failed to read file' } },
          });
        };

        reader.readAsDataURL(file);
      });
    }
  },

  getAll: async (type?: string) => {
    try {
      // Try backend first
      return await api.get('/images', { params: type ? { type } : {} });
    } catch (error) {
      // Demo mode: retrieve from localStorage
      await delay(200);
      
      if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem('demoImages') || '[]';
        let images = JSON.parse(stored);
        
        if (type) {
          images = images.filter((img: any) => img.type === type);
        }

        return {
          data: { images },
        };
      }

      return { data: { images: [] } };
    }
  },

  delete: (id: string) => api.delete(`/images/${id}`),
  
  save: async (data: { url: string; cloudinaryId?: string; metadata?: any }) => {
    try {
      return await api.post('/images/save', data);
    } catch (error) {
      // Demo mode: just return success
      await delay(300);
      return { data: { success: true } };
    }
  },
};

// Try-On API
export const tryOnAPI = {
  generate: async (data: { personImageId: string; outfitImageId: string }) => {
    try {
      // Try backend first
      return await api.post('/tryon/generate', data);
    } catch (error) {
      // Demo mode: create a mock result image
      await delay(2000);
      
      const demoResultImage = {
        id: `demo-result-${Date.now()}`,
        url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Cdefs%3E%3ClinearGradient id='grad'%3E%3Cstop offset='0%25' stop-color='%231e293b'/%3E%3Cstop offset='100%25' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='600' fill='url(%23grad)'/%3E%3Ctext x='200' y='300' font-size='24' fill='%2364748b' text-anchor='middle' font-family='Arial'%3ETry-On Result%3C/text%3E%3Ctext x='200' y='330' font-size='14' fill='%2394a3b8' text-anchor='middle' font-family='Arial'%3E(Demo Mode)%3C/text%3E%3C/svg%3E`,
        resultOf: {
          personImageId: data.personImageId,
          outfitImageId: data.outfitImageId,
        },
        createdAt: new Date().toISOString(),
      };

      return {
        data: { image: demoResultImage },
      };
    }
  },
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
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/user/profile', { password: data.newPassword, currentPassword: data.currentPassword }),
  deleteAccount: () => api.delete('/user/account'),
};

export default api;

