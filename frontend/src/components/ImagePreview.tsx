'use client';

import Image from 'next/image';

interface ImagePreviewProps {
  image: {
    url: string;
    id?: string;
    createdAt?: string;
  };
}

export function ImagePreview({ image }: ImagePreviewProps) {
  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
      <img
        src={image.url}
        alt="Generated result"
        className="w-full rounded-xl shadow-lg shadow-slate-900/70"
      />
    </div>
  );
}

