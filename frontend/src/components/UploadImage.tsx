'use client';

import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface UploadImageProps {
  onUpload: (file: File) => void;
  currentImage?: any;
}

export function UploadImage({ onUpload, currentImage }: UploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayImage = currentImage?.url || preview;

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {displayImage ? (
        <div className="relative w-full h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
          <img
            src={displayImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary-500 transition"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-600">Click to upload</p>
          <p className="text-sm text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
        </button>
      )}
    </div>
  );
}

