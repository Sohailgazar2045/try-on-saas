'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { imageAPI, tryOnAPI, authAPI } from '@/lib/api';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { UploadImage } from '@/components/UploadImage';
import { ImagePreview } from '@/components/ImagePreview';
import { GenerateButton } from '@/components/GenerateButton';
import toast from 'react-hot-toast';
import { Check, Zap } from 'lucide-react';

export default function TryOnPage() {
  return (
    <ProtectedRoute>
      <TryOnContent />
    </ProtectedRoute>
  );
}

function TryOnContent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [personImage, setPersonImage] = useState<any>(null);
  const [outfitImage, setOutfitImage] = useState<any>(null);
  const [resultImage, setResultImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userImages, setUserImages] = useState<any[]>([]);

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
    <div className="flex h-screen bg-slate-950 text-slate-50">
      <Sidebar user={user} />

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <Header 
          user={user} 
          title="AI Virtual Try-On"
          subtitle="Pair photos & generate realistic on-body previews"
          showNotifications={true}
        />

        <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-6">
          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-center gap-4">
            {[
              { number: 1, label: 'Person', complete: !!personImage },
              { number: 2, label: 'Garment', complete: !!outfitImage },
              { number: 3, label: 'Generate', complete: !!resultImage }
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`relative flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all duration-300 ${
                  step.complete 
                    ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50' 
                    : 'bg-slate-800/50 text-slate-400 ring-1 ring-slate-800'
                }`}>
                  {step.complete ? <Check className="h-5 w-5" /> : step.number}
                </div>
                <span className={`text-xs font-semibold transition-colors ${step.complete ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {step.label}
                </span>
                {idx < 2 && <div className="h-0.5 w-8 bg-slate-800" />}
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Person Image */}
            <div className="card-elevated">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/20 text-xs font-bold text-primary-400">1</span>
                    Person Photo
                  </h2>
                  <p className="mt-2 text-xs text-slate-500">
                    Upload a clear, front-facing portrait with good lighting
                  </p>
                </div>
                {personImage && <Check className="h-5 w-5 text-emerald-400 mt-1" />}
              </div>
              <UploadImage
                onUpload={handlePersonUpload}
                currentImage={personImage}
              />
              {userPhotos.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <p className="mb-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Quick Select</p>
                  <div className="grid grid-cols-3 gap-2">
                    {userPhotos.slice(0, 3).map((img) => (
                      <button
                        key={img.id}
                        onClick={() => handleSelectImage(img, 'user')}
                        className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                          personImage?.id === img.id
                            ? 'border-emerald-400 shadow-lg shadow-emerald-500/20'
                            : 'border-slate-800 hover:border-primary-500/50'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt="User photo"
                          className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {personImage?.id === img.id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                            <Check className="h-5 w-5 text-emerald-400" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Outfit Image */}
            <div className="card-elevated">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-400">2</span>
                    Garment Image
                  </h2>
                  <p className="mt-2 text-xs text-slate-500">
                    Upload the product image you want to visualize on-body
                  </p>
                </div>
                {outfitImage && <Check className="h-5 w-5 text-emerald-400 mt-1" />}
              </div>
              <UploadImage
                onUpload={handleOutfitUpload}
                currentImage={outfitImage}
              />
              {outfitPhotos.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <p className="mb-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Quick Select</p>
                  <div className="grid grid-cols-3 gap-2">
                    {outfitPhotos.slice(0, 3).map((img) => (
                      <button
                        key={img.id}
                        onClick={() => handleSelectImage(img, 'outfit')}
                        className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                          outfitImage?.id === img.id
                            ? 'border-emerald-400 shadow-lg shadow-emerald-500/20'
                            : 'border-slate-800 hover:border-sky-500/50'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt="Outfit"
                          className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {outfitImage?.id === img.id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                            <Check className="h-5 w-5 text-emerald-400" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Generate Button Section */}
          <div className="mb-8 flex justify-center">
            <GenerateButton
              onClick={handleGenerate}
              disabled={!personImage || !outfitImage || loading}
              loading={loading}
            />
          </div>

          {/* Result Section */}
          {resultImage && (
            <div className="glass-panel-premium">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">✓</span>
                    Try-On Result
                  </h2>
                  <p className="mt-2 text-xs text-slate-500">
                    Your AI-generated try-on preview is ready. Save it to your gallery or regenerate
                  </p>
                </div>
              </div>
              <ImagePreview image={resultImage} />
              <button
                onClick={handleSave}
                className="mt-6 primary-button-lg flex items-center justify-center gap-2 w-full"
              >
                <Zap className="h-5 w-5" />
                Save to Gallery
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

