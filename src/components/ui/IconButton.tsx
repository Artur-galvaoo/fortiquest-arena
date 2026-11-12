import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  tooltip?: string;
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  'aria-label': ariaLabel,
  tooltip,
  className = '',
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={tooltip || ariaLabel}
      disabled={disabled}
      className={`w-9 h-9 inline-flex items-center justify-center rounded-full text-muted hover:text-text hover:bg-subtle transition-colors select-none shrink-0 cursor-pointer ${
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
