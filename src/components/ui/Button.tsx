import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors cursor-pointer select-none text-[14px] leading-none shrink-0';

  const sizeClasses = size === 'sm' ? 'h-8 px-3 text-[13px]' : 'h-10 px-4 text-[14px]';

  const variantClasses = {
    primary:
      'bg-accent text-white hover:bg-accent-hover active:bg-accent-hover shadow-xs',
    secondary:
      'bg-surface border border-border text-text hover:bg-subtle active:bg-subtle',
    ghost:
      'bg-transparent text-text hover:bg-subtle active:bg-subtle',
    danger:
      'bg-surface border border-border text-danger hover:bg-danger-soft active:bg-danger-soft',
  }[variant];

  const disabledClasses = disabled
    ? 'opacity-40 cursor-not-allowed pointer-events-none'
    : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
