import React, { useEffect, useId } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';
import { registerModal, unregisterModal, isTopModal } from './modalStack';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: '720px' | '960px';
  headerActions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = '960px',
  headerActions,
}) => {
  const modalId = useId();

  useEffect(() => {
    if (isOpen) {
      registerModal(modalId);
    }
    return () => {
      unregisterModal(modalId);
    };
  }, [isOpen, modalId]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTopModal(modalId)) {
          e.stopPropagation();
          e.preventDefault();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, modalId, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center sm:p-4 bg-[rgba(16,24,40,0.40)] overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full bg-surface shadow-pop flex flex-col h-full sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-xl border-0 sm:border sm:border-border overflow-hidden transition-all ${
          maxWidth === '720px' ? 'sm:max-w-[720px]' : 'sm:max-w-[960px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-[20px] font-semibold text-text leading-tight">
              {title}
            </h2>
            {headerActions}
          </div>
          <IconButton
            aria-label="Fechar modal"
            onClick={onClose}
          >
            <X className="w-4 h-4 stroke-[1.75]" />
          </IconButton>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-surface">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-5 py-3.5 border-t border-border bg-surface shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
