import React from 'react';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'accent' | 'success' | 'danger';
  clickable?: boolean;
  active?: boolean;
  children: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'neutral',
  clickable = false,
  active = false,
  className = '',
  children,
  onClick,
  ...props
}) => {
  let colorClasses = 'bg-subtle text-muted';

  if (active || variant === 'accent') {
    colorClasses = 'bg-accent-soft text-accent';
  } else if (variant === 'success') {
    colorClasses = 'bg-success-soft text-success';
  } else if (variant === 'danger') {
    colorClasses = 'bg-danger-soft text-danger';
  }

  const interactiveClasses = clickable
    ? 'cursor-pointer hover:bg-border-strong/20 active:opacity-80 transition-colors select-none'
    : '';

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 h-[22px] px-2 text-[12px] font-medium rounded-sm whitespace-nowrap leading-none ${colorClasses} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
