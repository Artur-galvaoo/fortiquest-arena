import React, { useState, useEffect, useRef, useId } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, X, Upload } from 'lucide-react';
import { IconButton } from './ui/IconButton';
import { Button } from './ui/Button';
import { registerModal, unregisterModal, isTopModal } from './ui/modalStack';

interface ImageLightboxProps {
  isOpen: boolean;
  imageUrl?: string;
  label?: string;
  onClose: () => void;
  onImageUploaded?: (newUrl: string) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  imageUrl,
  label,
  onClose,
  onImageUploaded,
}) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lightboxId = useId();

  // Reset zoom & pan on open
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      registerModal(lightboxId);
    }
    return () => {
      unregisterModal(lightboxId);
    };
  }, [isOpen, imageUrl, lightboxId]);

  // Esc key listener with modal stack
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTopModal(lightboxId)) {
          e.stopPropagation();
          e.preventDefault();
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxId, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.35, 4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.35, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUploaded) {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const result = loadEvt.target?.result as string;
        if (result) onImageUploaded(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      role="dialog"
      aria-modal="true"
    >
      {/* Top right close button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-md bg-surface text-text hover:bg-subtle flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar lightbox"
          title="Fechar (Esc)"
        >
          <X className="w-5 h-5 stroke-[1.75]" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="w-full h-full flex items-center justify-center p-6 cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={label || 'Exhibit ampliado'}
            draggable={false}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-md shadow-pop pointer-events-none transition-transform duration-75"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            }}
          />
        ) : (
          <div className="text-white text-[14px]">Nenhuma imagem disponível</div>
        )}
      </div>

      {/* Floating Bottom Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-surface border border-border rounded-md shadow-pop px-3 py-2 flex items-center gap-1.5 text-text">
        <IconButton
          aria-label="Diminuir zoom"
          tooltip="Diminuir zoom"
          onClick={handleZoomOut}
        >
          <ZoomOut className="w-4 h-4 stroke-[1.75]" />
        </IconButton>

        <span className="font-mono text-[12px] text-muted px-1.5 tabular-nums">
          {Math.round(zoom * 100)}%
        </span>

        <IconButton
          aria-label="Aumentar zoom"
          tooltip="Aumentar zoom"
          onClick={handleZoomIn}
        >
          <ZoomIn className="w-4 h-4 stroke-[1.75]" />
        </IconButton>

        <IconButton
          aria-label="Ajustar ao tamanho original"
          tooltip="Ajustar"
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4 stroke-[1.75]" />
        </IconButton>

        {onImageUploaded && (
          <>
            <div className="w-[1px] h-5 bg-border mx-1" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>Substituir imagem</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
