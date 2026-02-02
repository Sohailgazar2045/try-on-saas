'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { imageAPI, tryOnAPI, authAPI } from '@/lib/api';
import { isDemoMode, getDemoUser, getDemoImages } from '@/lib/auth';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { UploadImage } from '@/components/UploadImage';
import { ImagePreview } from '@/components/ImagePreview';
import { GenerateButton } from '@/components/GenerateButton';
import toast from 'react-hot-toast';
import { Check, Zap, Upload, Shirt, Sparkles, Download, ArrowRight } from 'lucide-react';

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
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchUserImages();
  }, []);

  const fetchUserData = async () => {
    const demo = isDemoMode();
    setIsDemo(demo);

    if (demo) {
      setUser(getDemoUser());
      return;
    }

    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const fetchUserImages = async () => {
    if (isDemoMode()) {
      setUserImages(getDemoImages());
      return;
    }

    try {
      const response = await imageAPI.getAll();
      setUserImages(response.data.images);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const handlePersonUpload = async (file: File) => {
    if (isDemo) {
      toast.error('Sign up to upload your own images');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'user');

      const response = await imageAPI.upload(formData);
      setPersonImage(response.data.image);
      toast.success('Photo uploaded!');
      fetchUserImages();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload failed');
    }
  };

  const handleOutfitUpload = async (file: File) => {
    if (isDemo) {
      toast.error('Sign up to upload your own images');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'outfit');

      const response = await imageAPI.upload(formData);
      setOutfitImage(response.data.image);
      toast.success('Garment uploaded!');
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
      toast.error('Please select both images');
      return;
    }

    if (isDemo) {
      // Simulate generation in demo mode
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Use a demo result image
      setResultImage({
        id: 'demo-result',
        url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=600&fit=crop',
        type: 'generated',
      });
      toast.success('Try-on generated! (Demo)');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await tryOnAPI.generate({
        personImageId: personImage.id,
        outfitImageId: outfitImage.id,
      });

      setResultImage(response.data.image);
      toast.success('Try-on generated!');
      fetchUserData();
      fetchUserImages();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!resultImage) return;

    if (isDemo) {
      toast.error('Sign up to save images to your gallery');
      return;
    }

    try {
      await imageAPI.save({
        url: resultImage.url,
        metadata: {
          personImageId: personImage?.id,
          outfitImageId: outfitImage?.id,
        },
      });
      toast.success('Saved to gallery!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Save failed');
    }
  };

  const userPhotos = userImages.filter((img) => img.type === 'user');
  const outfitPhotos = userImages.filter((img) => img.type === 'outfit');

  const steps = [
    { number: 1, label: 'Person', icon: Upload, complete: !!personImage },
    { number: 2, label: 'Garment', icon: Shirt, complete: !!outfitImage },
    { number: 3, label: 'Result', icon: Sparkles, complete: !!resultImage },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0b]">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user} 
          title="Try-On Studio"
          subtitle={isDemo ? "Try selecting images below to see how it works" : "Try on clothes before you buy, or create product visuals for your business"}
          showNotifications={!isDemo}
        />

        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-center">
              <div className="flex items-center gap-3">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
                      step.complete 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-white/[0.04] text-zinc-500'
                    }`}>
                      {step.complete ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <step.icon className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">{step.label}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`w-12 h-px ${
                        steps[idx + 1].complete || step.complete ? 'bg-emerald-500/30' : 'bg-white/[0.06]'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Grid */}
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              {/* Person Upload */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                      <Upload className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">Your Photo</h2>
                      <p className="text-xs text-zinc-500">Upload your photo or model image. Front-facing works best.</p>
                    </div>
                  </div>
                  {personImage && <Check className="h-5 w-5 text-emerald-400" />}
                </div>
                
                <UploadImage
                  onUpload={handlePersonUpload}
                  currentImage={personImage}
                />
                
                {userPhotos.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/[0.06]">
                    <p className="text-xs font-medium text-zinc-500 mb-3">Recent uploads</p>
                    <div className="grid grid-cols-3 gap-2">
                      {userPhotos.slice(0, 3).map((img) => (
                        <button
                          key={img.id}
                          onClick={() => handleSelectImage(img, 'user')}
                          className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                            personImage?.id === img.id
                              ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                              : 'border-transparent hover:border-white/10'
                          }`}
                        >
                          <img
                            src={img.url}
                            alt="User photo"
                            className="h-full w-full object-cover"
                          />
                          {personImage?.id === img.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20">
                              <Check className="h-5 w-5 text-emerald-400" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Outfit Upload */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                      <Shirt className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">Clothing Item</h2>
                      <p className="text-xs text-zinc-500">Select the garment you want to try on. Works with any clothing type.</p>
                    </div>
                  </div>
                  {outfitImage && <Check className="h-5 w-5 text-emerald-400" />}
                </div>
                
                <UploadImage
                  onUpload={handleOutfitUpload}
                  currentImage={outfitImage}
                />
                
                {outfitPhotos.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/[0.06]">
                    <p className="text-xs font-medium text-zinc-500 mb-3">Recent uploads</p>
                    <div className="grid grid-cols-3 gap-2">
                      {outfitPhotos.slice(0, 3).map((img) => (
                        <button
                          key={img.id}
                          onClick={() => handleSelectImage(img, 'outfit')}
                          className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                            outfitImage?.id === img.id
                              ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                              : 'border-transparent hover:border-white/10'
                          }`}
                        >
                          <img
                            src={img.url}
                            alt="Outfit"
                            className="h-full w-full object-cover"
                          />
                          {outfitImage?.id === img.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20">
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

            {/* Generate Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handleGenerate}
                disabled={!personImage || !outfitImage || loading}
                className="btn-primary px-12 py-4 text-base disabled:opacity-40"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Try-On
                    <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                      1 credit
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Result Section */}
            {resultImage && (
              <div className="card-highlight">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                      <Check className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">Result Ready</h2>
                      <p className="text-xs text-zinc-500">Your AI-generated try-on preview</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06]">
                  <ImagePreview image={resultImage} />
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button onClick={handleSave} className="btn-primary flex-1 justify-center py-3">
                    <Download className="h-5 w-5" />
                    Save to Gallery
                  </button>
                  <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="btn-secondary flex-1 justify-center py-3"
                  >
                    <Sparkles className="h-5 w-5" />
                    Regenerate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
