import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration: number; // in milliseconds
  createdAt: number;
}

export interface NotificationContextType {
  toasts: ToastItem[];
  showToast: (options: {
    type?: ToastType;
    title?: string;
    message: string;
    duration?: number;
  }) => string;
  notifySuccess: (message: string, title?: string, duration?: number) => string;
  notifyError: (message: string, title?: string, duration?: number) => string;
  notifyInfo: (message: string, title?: string, duration?: number) => string;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const dismissToast = useCallback((id: string) => {
    // Clear timer if active
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const showToast = useCallback(
    ({
      type = 'info',
      title,
      message,
      duration = 4500,
    }: {
      type?: ToastType;
      title?: string;
      message: string;
      duration?: number;
    }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const defaultTitle =
        title ||
        (type === 'success'
          ? 'Message Sent'
          : type === 'error'
          ? 'Submission Error'
          : 'Notification');

      const newToast: ToastItem = {
        id,
        type,
        title: defaultTitle,
        message,
        duration,
        createdAt: Date.now(),
      };

      setToasts((prev) => [newToast, ...prev].slice(0, 5)); // Keep max 5 toasts visible

      if (duration > 0) {
        const timer = setTimeout(() => {
          dismissToast(id);
        }, duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [dismissToast]
  );

  const notifySuccess = useCallback(
    (message: string, title = 'Message Sent!', duration = 4500) => {
      return showToast({ type: 'success', title, message, duration });
    },
    [showToast]
  );

  const notifyError = useCallback(
    (message: string, title = 'Error Occurred', duration = 5000) => {
      return showToast({ type: 'error', title, message, duration });
    },
    [showToast]
  );

  const notifyInfo = useCallback(
    (message: string, title = 'Notice', duration = 4000) => {
      return showToast({ type: 'info', title, message, duration });
    },
    [showToast]
  );

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        showToast,
        notifySuccess,
        notifyError,
        notifyInfo,
        dismissToast,
        clearAllToasts,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
