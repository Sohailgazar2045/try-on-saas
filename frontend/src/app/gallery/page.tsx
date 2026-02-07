'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { imageAPI, authAPI } from '@/lib/api';
import { isDemoMode, getDemoUser, getDemoImages } from '@/lib/auth';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Image as ImageIcon, Download, Trash2, Search, ZoomIn, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GalleryPage() {
  return (
    <ProtectedRoute>
      <GalleryContent />
    </ProtectedRoute>
  );
}

function GalleryContent() {
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'user' | 'outfit' | 'generated'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const demo = isDemoMode();
    setIsDemo(demo);

    if (demo) {
      setUser(getDemoUser());
      setImages(getDemoImages());
      setLoading(false);
      return;
    }

    try {
      const [profileRes, imagesRes] = await Promise.all([
        authAPI.getProfile(),
        imageAPI.getAll()
      ]);
      setUser(profileRes.data.user);
      setImages(imagesRes.data.images || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (isDemo) {
      toast.error('Sign up to manage your images');
      return;
    }
    
    if (!confirm('Delete this image?')) return;
    
    try {
      await imageAPI.delete(imageId);
      setImages(images.filter(img => img.id !== imageId));
      toast.success('Image deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleDownload = (image: any) => {
    if (isDemo) {
      toast.error('Sign up to download images');
      return;
    }
    
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `image-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredImages = images.filter(img => {
    if (filter !== 'all' && img.type !== filter) return false;
    return true;
  });

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'generated', label: 'Generated' },
    { value: 'user', label: 'Person' },
    { value: 'outfit', label: 'Garments' },
  ];

  return (
    <div className="flex h-screen bg-surface">
      <Sidebar 
        user={user} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header 
          user={user} 
          title="Gallery"
          subtitle={isDemo ? "Sample images in demo mode" : `${images.length} images in your collection`}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === f.value
                        ? 'bg-overlay-8 text-foreground'
                        : 'text-foreground-tertiary hover:text-foreground hover:bg-overlay-4'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-tertiary" />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 w-64"
                />
              </div>
            </div>

            {/* Gallery Grid */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-foreground-tertiary">Loading...</div>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-overlay-4 mb-4">
                  <ImageIcon className="h-8 w-8 text-foreground-tertiary" />
                </div>
                <p className="text-foreground-secondary font-medium">No images yet</p>
                <p className="text-sm text-foreground-tertiary mt-1">Upload images or generate try-ons to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <div key={image.id} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-overlay-2 border border-subtle">
                    <img
                      src={image.url}
                      alt={image.type}
                      className="h-full w-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="inline-block rounded-full bg-white/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-white capitalize">
                          {image.type}
                        </span>
                      </div>
                      
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedImage(image)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(image)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 backdrop-blur-sm text-red-400 hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={selectedImage.url}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
