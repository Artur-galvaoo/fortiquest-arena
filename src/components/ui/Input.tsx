import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`h-10 px-3.5 text-[14px] text-text placeholder:text-faint bg-surface border rounded-md transition-colors w-full ${
          error
            ? 'border-danger focus:border-danger focus:ring-3 focus:ring-danger-soft'
            : 'border-border hover:border-border-strong focus:border-accent focus:ring-3 focus:ring-accent-soft'
        } focus:outline-none ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
