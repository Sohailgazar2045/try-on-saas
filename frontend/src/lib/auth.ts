import Cookies from 'js-cookie';

export const setAuthToken = (token: string) => {
  Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
};

export const getAuthToken = () => {
  return Cookies.get('token');
};

export const removeAuthToken = () => {
  Cookies.remove('token');
  Cookies.remove('demo_mode');
};

export const isAuthenticated = () => {
  return !!getAuthToken() || isDemoMode();
};

// Demo mode functions
export const enableDemoMode = () => {
  Cookies.set('demo_mode', 'true', { expires: 1 }); // Expires in 1 day
};

export const disableDemoMode = () => {
  Cookies.remove('demo_mode');
};

export const isDemoMode = () => {
  return Cookies.get('demo_mode') === 'true';
};

// Demo user data
export const getDemoUser = () => ({
  id: 'demo-user-123',
  name: 'Demo User',
  email: 'demo@virtualtry-on.com',
  credits: 25,
  subscription: 'pro',
  createdAt: new Date().toISOString(),
});

// Demo images data
export const getDemoImages = () => [
  {
    id: 'demo-img-1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
    type: 'user',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'demo-img-2',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
    type: 'user',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'demo-img-3',
    url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=600&fit=crop',
    type: 'outfit',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 'demo-img-4',
    url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop',
    type: 'outfit',
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: 'demo-img-5',
    url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=600&fit=crop',
    type: 'generated',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: 'demo-img-6',
    url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop',
    type: 'generated',
    createdAt: new Date(Date.now() - 518400000).toISOString(),
  },
];
