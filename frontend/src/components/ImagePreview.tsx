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
    <div className="relative w-full max-w-2xl mx-auto">
      <img
        src={image.url}
        alt="Generated result"
        className="w-full rounded-lg shadow-lg"
      />
    </div>
  );
}

