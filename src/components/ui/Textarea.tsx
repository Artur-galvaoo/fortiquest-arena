import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`p-3 text-[14px] leading-relaxed text-text placeholder:text-faint bg-surface border rounded-md transition-colors w-full resize-y ${
          error
            ? 'border-danger focus:border-danger focus:ring-3 focus:ring-danger-soft'
            : 'border-border hover:border-border-strong focus:border-accent focus:ring-3 focus:ring-accent-soft'
        } focus:outline-none ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
