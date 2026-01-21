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
        <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80">
          <img
            src={displayImage}
            alt="Preview"
            className="h-full w-full object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-full bg-red-600/90 p-1.5 text-white shadow-sm hover:bg-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="flex h-60 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 text-center text-xs text-slate-300 transition hover:border-primary-500 hover:bg-slate-900"
        >
          <Upload className="mb-2 h-8 w-8 text-slate-400" />
          <p>Click to upload</p>
          <p className="mt-1 text-[11px] text-slate-500">PNG, JPG, WEBP up to 5MB</p>
        </button>
      )}
    </div>
  );
}

