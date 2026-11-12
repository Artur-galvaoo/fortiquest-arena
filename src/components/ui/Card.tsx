import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className = '',
  interactive = false,
  children,
  ...props
}) => {
  return (
    <div
      className={`bg-surface border border-border rounded-lg shadow-card p-5 ${
        interactive ? 'hover:border-border-strong cursor-pointer transition-colors' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
