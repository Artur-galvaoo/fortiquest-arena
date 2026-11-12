import React from 'react';

export interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export const Kbd: React.FC<KbdProps> = ({ children, className = '' }) => {
  return (
    <kbd
      className={`inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 font-mono text-[11px] text-muted bg-surface border border-border rounded-[6px] shadow-xs select-none ${className}`}
    >
      {children}
    </kbd>
  );
};
