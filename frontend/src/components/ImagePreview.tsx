'use client';

import { useState } from 'react';
import { Download, ZoomIn, ZoomOut, X } from 'lucide-react';

interface ImagePreviewProps {
  image: any;
}

export function ImagePreview({ image }: ImagePreviewProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `tryon-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="relative group">
        <img
          src={image.url}
          alt="Try-on result"
          className="w-full aspect-[3/4] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 group-hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100">
          <button
            onClick={() => setIsZoomed(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={handleDownload}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={image.url}
            alt="Try-on result"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
