import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', error, children, ...props }, ref) => {
    return (
      <div className="relative inline-block w-full">
        <select
          ref={ref}
          className={`h-10 pl-3.5 pr-9 text-[14px] text-text bg-surface border rounded-md transition-colors w-full appearance-none cursor-pointer ${
            error
              ? 'border-danger focus:border-danger focus:ring-3 focus:ring-danger-soft'
              : 'border-border hover:border-border-strong focus:border-accent focus:ring-3 focus:ring-accent-soft'
          } focus:outline-none ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none stroke-[1.75]"
          aria-hidden="true"
        />
      </div>
    );
  }
);

Select.displayName = 'Select';
