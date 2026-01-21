'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { imageAPI, tryOnAPI, authAPI } from '@/lib/api';
import { CreditCounter } from '@/components/CreditCounter';
import { UploadImage } from '@/components/UploadImage';
import { ImagePreview } from '@/components/ImagePreview';
import { GenerateButton } from '@/components/GenerateButton';
import { LayoutDashboard, Sparkles, Image as ImageIcon, CreditCard, User, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TryOnPage() {
  return (
    <ProtectedRoute>
      <TryOnContent />
    </ProtectedRoute>
  );
}

function TryOnContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [personImage, setPersonImage] = useState<any>(null);
  const [outfitImage, setOutfitImage] = useState<any>(null);
  const [resultImage, setResultImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userImages, setUserImages] = useState<any[]>([]);

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', active: pathname === '/dashboard' },
    { href: '/try-on', icon: Sparkles, label: 'Try-On', active: pathname === '/try-on' },
    { href: '/gallery', icon: ImageIcon, label: 'Gallery', active: pathname === '/gallery' },
    { href: '/billing', icon: CreditCard, label: 'Billing', active: pathname === '/billing' },
    { href: '/profile', icon: User, label: 'Profile', active: pathname === '/profile' },
  ];

  useEffect(() => {
    fetchUserData();
    fetchUserImages();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to load profile for try-on (demo mode):', error);
    }
  };

  const fetchUserImages = async () => {
    try {
      const response = await imageAPI.getAll();
      setUserImages(response.data.images);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const handlePersonUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'user');

      const response = await imageAPI.upload(formData);
      setPersonImage(response.data.image);
      toast.success('Person image uploaded!');
      fetchUserImages();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload failed');
    }
  };

  const handleOutfitUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'outfit');

      const response = await imageAPI.upload(formData);
      setOutfitImage(response.data.image);
      toast.success('Outfit image uploaded!');
      fetchUserImages();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload failed');
    }
  };

  const handleSelectImage = (image: any, type: 'user' | 'outfit') => {
    if (type === 'user') {
      setPersonImage(image);
    } else {
      setOutfitImage(image);
    }
  };

  const handleGenerate = async () => {
    if (!personImage || !outfitImage) {
      toast.error('Please upload both person and outfit images');
      return;
    }

    setLoading(true);
    try {
      const response = await tryOnAPI.generate({
        personImageId: personImage.id,
        outfitImageId: outfitImage.id,
      });

      setResultImage(response.data.image);
      toast.success('Try-on generated successfully!');
      fetchUserData(); // Refresh credits
      fetchUserImages(); // Refresh gallery
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!resultImage) return;

    try {
      await imageAPI.save({
        url: resultImage.url,
        metadata: {
          personImageId: personImage?.id,
          outfitImageId: outfitImage?.id,
        },
      });
      toast.success('Image saved to gallery!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Save failed');
    }
  };

  const userPhotos = userImages.filter((img) => img.type === 'user');
  const outfitPhotos = userImages.filter((img) => img.type === 'outfit');

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/80 bg-slate-950/95 backdrop-blur">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-slate-800/80 px-4">
            <span className="h-8 w-8 shrink-0 rounded-xl bg-primary-500/90 shadow-lg shadow-primary-500/40" />
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              Virtual Try-On
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-primary-500/10 text-primary-300'
                      : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-slate-800/80 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary-400 to-sky-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-200">
                  {user?.name || user?.email || 'User'}
                </p>
                <p className="truncate text-[10px] text-slate-500">
                  {user?.email || 'demo@tryon.dev'}
                </p>
              </div>
            </div>
            <CreditCounter credits={user?.credits || 0} />
            <button
              onClick={async () => {
                await authAPI.logout();
                router.push('/');
              }}
              className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-900/50 hover:text-slate-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-lg font-semibold text-slate-100">AI virtual try-on</h1>
              <p className="text-xs text-slate-500">
                Pair a person photo with a garment image, then generate a realistic on‑body preview.
              </p>
            </div>
          </div>
        </header>

        <div className="px-6 py-6">
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {/* Person Image */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold text-slate-100">1. Person photo</h2>
            <p className="mb-4 text-xs text-slate-400">
              Upload a customer, model, or mannequin shot with clear lighting.
            </p>
            <UploadImage
              onUpload={handlePersonUpload}
              currentImage={personImage}
            />
            {userPhotos.length > 0 && (
              <div className="mt-4">
                <p className="mt-4 text-xs text-slate-400">Or select from your library:</p>
                <div className="grid grid-cols-3 gap-2">
                  {userPhotos.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => handleSelectImage(img, 'user')}
                      className={`border-2 rounded-lg overflow-hidden ${
                        personImage?.id === img.id
                          ? 'border-primary-400'
                          : 'border-slate-700'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt="User photo"
                        className="w-full h-24 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Outfit Image */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold text-slate-100">2. Garment image</h2>
            <p className="mb-4 text-xs text-slate-400">
              Upload the product image you&apos;d like to visualize on-body.
            </p>
            <UploadImage
              onUpload={handleOutfitUpload}
              currentImage={outfitImage}
            />
            {outfitPhotos.length > 0 && (
              <div className="mt-4">
                <p className="mt-4 text-xs text-slate-400">Or select from your outfits:</p>
                <div className="grid grid-cols-3 gap-2">
                  {outfitPhotos.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => handleSelectImage(img, 'outfit')}
                      className={`border-2 rounded-lg overflow-hidden ${
                        outfitImage?.id === img.id
                          ? 'border-primary-400'
                          : 'border-slate-700'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt="Outfit"
                        className="w-full h-24 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mb-8 flex justify-center">
          <GenerateButton
            onClick={handleGenerate}
            disabled={!personImage || !outfitImage || loading}
            loading={loading}
          />
        </div>

        {/* Result */}
        {resultImage && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold text-slate-100">Result</h2>
            <p className="mb-4 text-xs text-slate-400">
              Save promising outputs to your gallery to reuse across channels.
            </p>
            <ImagePreview image={resultImage} />
            <button
              onClick={handleSave}
              className="mt-4 rounded-lg bg-primary-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-400"
            >
              Save to Gallery
            </button>
          </div>
        )}
        </div>
      </main>
    </div>
  );
}

