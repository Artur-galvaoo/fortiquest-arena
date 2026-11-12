import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface ToastData {
  id: number;
  message: string;
  type?: 'success' | 'danger' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'danger' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'danger' | 'info' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none items-center max-w-[90vw]">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="bg-surface text-text border border-border rounded-md shadow-pop px-4 py-2.5 text-[14px] flex items-center gap-2.5 transition-all select-none"
            >
              {toast.type === 'danger' ? (
                <AlertCircle className="w-4 h-4 text-danger stroke-[1.75] shrink-0" />
              ) : (
                <Check className="w-4 h-4 text-success stroke-[1.75] shrink-0" />
              )}
              <span className="font-medium">{toast.message}</span>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
