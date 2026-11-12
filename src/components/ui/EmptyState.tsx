import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 ${className}`}
    >
      {icon && (
        <div className="w-10 h-10 rounded-md bg-subtle flex items-center justify-center text-faint mb-3 shrink-0">
          {icon}
        </div>
      )}
      <p className="text-[14px] font-medium text-text leading-snug">
        {title}
      </p>
      {description && (
        <p className="text-[13px] text-muted mt-1 max-w-[360px] leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
