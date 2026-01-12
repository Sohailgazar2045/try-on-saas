'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { imageAPI } from '@/lib/api';
import { CreditCounter } from '@/components/CreditCounter';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '@/lib/api';

export default function GalleryPage() {
  return (
    <ProtectedRoute>
      <GalleryContent />
    </ProtectedRoute>
  );
}

function GalleryContent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchUserData();
    fetchImages();
  }, [filter]);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchImages = async () => {
    try {
      const response = await imageAPI.getAll(filter === 'all' ? undefined : filter);
      setImages(response.data.images);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await imageAPI.delete(id);
      toast.success('Image deleted');
      fetchImages();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const filteredImages = images.filter((img) => {
    if (filter === 'all') return true;
    return img.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/dashboard" className="text-2xl font-bold text-primary-700">
            Virtual Try-On
          </a>
          <div className="flex gap-4 items-center">
            <CreditCounter credits={user?.credits || 0} />
            <a href="/dashboard" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Gallery</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('user')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              My Photos
            </button>
            <button
              onClick={() => setFilter('outfit')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'outfit'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              Outfits
            </button>
            <button
              onClick={() => setFilter('generated')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'generated'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              Generated
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No images found. Start by uploading some photos!
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group relative"
              >
                <img
                  src={image.url}
                  alt={image.type}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-600 capitalize">{image.type}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

