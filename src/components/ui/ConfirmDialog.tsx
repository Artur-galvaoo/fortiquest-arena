import React from 'react';
import { Button } from './Button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="bg-surface border border-border rounded-lg shadow-pop p-6 max-w-[420px] w-full flex flex-col gap-4">
        <div>
          <h3 className="text-[18px] font-semibold text-text leading-snug mb-1.5">
            {title}
          </h3>
          <p className="text-[14px] text-muted leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            className={variant === 'danger' ? '!bg-danger !text-on-accent hover:!opacity-90' : ''}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
