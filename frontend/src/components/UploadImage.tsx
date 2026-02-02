'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface UploadImageProps {
  onUpload: (file: File) => void;
  currentImage?: any;
}

export function UploadImage({ onUpload, currentImage }: UploadImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  if (currentImage) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
        <img
          src={currentImage.url}
          alt="Uploaded"
          className="h-full w-full object-cover"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-black/60 backdrop-blur-sm px-3 py-2 text-xs font-medium text-white hover:bg-black/80 transition-colors"
        >
          <Upload className="h-4 w-4" />
          Replace
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative aspect-[3/4] flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all cursor-pointer ${
        isDragging
          ? 'border-orange-500 bg-orange-500/5'
          : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
      }`}
    >
      <div className="flex flex-col items-center text-center px-6">
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
          isDragging ? 'bg-orange-500/10' : 'bg-white/[0.04]'
        }`}>
          <ImageIcon className={`h-7 w-7 ${isDragging ? 'text-orange-400' : 'text-zinc-500'}`} />
        </div>
        <p className="mt-4 text-sm font-medium text-white">
          {isDragging ? 'Drop image here' : 'Click to upload'}
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          or drag and drop
        </p>
        <p className="mt-3 text-xs text-zinc-600">
          PNG, JPG up to 10MB
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
