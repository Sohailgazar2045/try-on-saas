'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { imageAPI, authAPI } from '@/lib/api';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Trash2, Download, Share2, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

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
      console.error('Failed to load profile for gallery (demo mode):', error);
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
    <div className="flex h-screen bg-slate-950 text-slate-50">
      <Sidebar user={user} />

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <Header 
          user={user} 
          title="Gallery"
          subtitle={`Browse and manage ${filteredImages.length} ${filter === 'all' ? 'images' : filter}`}
        />

        <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-6">
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-100">Your Collections</h2>
              <p className="mt-1 text-xs text-slate-500">Organize and manage all your try-on images</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All', count: images.length },
                { id: 'user', label: 'My Photos' },
                { id: 'outfit', label: 'Outfits' },
                { id: 'generated', label: 'Generated' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`group rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                    filter === f.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                      : 'bg-slate-900/50 text-slate-300 border border-slate-800 hover:border-primary-500/50 hover:text-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-12 w-12 rounded-full border-4 border-slate-800 border-t-primary-500 animate-spin" />
              <p className="mt-4 text-sm text-slate-400">Loading your gallery...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 py-20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50">
                <Copy className="h-8 w-8 text-slate-500" />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-300">No images found</p>
              <p className="mt-1 text-xs text-slate-500">Start by generating a new try-on or uploading photos</p>
            </div>
          ) : (
            <div className="grid auto-rows-max gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950/70 shadow-lg shadow-slate-900/30 transition-all duration-300 hover:border-primary-500/50 hover:shadow-primary-500/20"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-slate-950">
                    <img
                      src={image.url}
                      alt={image.type}
                      className="h-56 w-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary-400">
                          {image.type}
                        </p>
                        <p className="mt-2 text-[11px] text-slate-500">
                          {new Date(image.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="inline-block rounded-full bg-slate-800/50 px-2 py-1 text-[10px] text-slate-400">
                        {Math.random() > 0.5 ? 'Pro' : 'Free'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(image.url);
                        toast.success('Link copied!');
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/80 text-slate-300 hover:bg-primary-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/80 text-slate-300 hover:bg-red-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

