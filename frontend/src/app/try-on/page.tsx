'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { imageAPI, tryOnAPI } from '@/lib/api';
import { CreditCounter } from '@/components/CreditCounter';
import { UploadImage } from '@/components/UploadImage';
import { ImagePreview } from '@/components/ImagePreview';
import { GenerateButton } from '@/components/GenerateButton';
import toast from 'react-hot-toast';
import { authAPI } from '@/lib/api';

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
      router.push('/login');
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
        <h1 className="text-4xl font-bold mb-8 text-gray-900">AI Virtual Try-On</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Person Image */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">1. Person Photo</h2>
            <UploadImage
              onUpload={handlePersonUpload}
              currentImage={personImage}
            />
            {userPhotos.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Or select from your photos:</p>
                <div className="grid grid-cols-3 gap-2">
                  {userPhotos.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => handleSelectImage(img, 'user')}
                      className={`border-2 rounded-lg overflow-hidden ${
                        personImage?.id === img.id
                          ? 'border-primary-600'
                          : 'border-gray-200'
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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">2. Outfit Photo</h2>
            <UploadImage
              onUpload={handleOutfitUpload}
              currentImage={outfitImage}
            />
            {outfitPhotos.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Or select from your outfits:</p>
                <div className="grid grid-cols-3 gap-2">
                  {outfitPhotos.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => handleSelectImage(img, 'outfit')}
                      className={`border-2 rounded-lg overflow-hidden ${
                        outfitImage?.id === img.id
                          ? 'border-primary-600'
                          : 'border-gray-200'
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
        <div className="flex justify-center mb-8">
          <GenerateButton
            onClick={handleGenerate}
            disabled={!personImage || !outfitImage || loading}
            loading={loading}
          />
        </div>

        {/* Result */}
        {resultImage && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Result</h2>
            <ImagePreview image={resultImage} />
            <button
              onClick={handleSave}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Save to Gallery
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

