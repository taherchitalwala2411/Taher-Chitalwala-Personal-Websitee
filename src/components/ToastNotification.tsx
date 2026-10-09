import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useNotification, ToastItem, ToastType } from '../context/NotificationContext';

const ToastIcon: React.FC<{ type: ToastType }> = ({ type }) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
    case 'error':
      return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />;
    case 'info':
    default:
      return <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />;
  }
};

const ToastCard: React.FC<{ toast: ToastItem; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;

    const intervalTime = 20; // 50 updates per second
    const decrement = (intervalTime / toast.duration) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev - decrement;
        return next <= 0 ? 0 : next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [toast.duration]);

  // Color styles based on type
  const borderAndBgStyles = {
    success:
      'border-emerald-200 dark:border-emerald-800/80 bg-white dark:bg-stone-900 shadow-emerald-950/5',
    error:
      'border-red-200 dark:border-red-800/80 bg-white dark:bg-stone-900 shadow-red-950/5',
    info:
      'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-stone-950/5',
  }[toast.type];

  const progressBgStyle = {
    success: 'bg-emerald-500 dark:bg-emerald-400',
    error: 'bg-red-500 dark:bg-red-400',
    info: 'bg-sky-500 dark:bg-sky-400',
  }[toast.type];

  const badgeBg = {
    success: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200',
    error: 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200',
    info: 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200',
  }[toast.type];

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`relative overflow-hidden rounded-2xl border p-4 shadow-xl transition-all duration-300 pointer-events-auto transform translate-y-0 ${borderAndBgStyles} flex flex-col gap-2`}
    >
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div className={`p-2 rounded-xl shrink-0 ${badgeBg}`}>
          <ToastIcon type={toast.type} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-stone-950 dark:text-stone-50">
              {toast.title}
            </h4>
            <span
              className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold tracking-wider ${
                toast.type === 'success'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                  : toast.type === 'error'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300'
                  : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {toast.type}
            </span>
          </div>
          <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
            {toast.message}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Real-time countdown progress line */}
      {toast.duration > 0 && (
        <div className="w-full h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mt-1">
          <div
            className={`h-full transition-all duration-75 ease-linear rounded-full ${progressBgStyle}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed top-20 right-4 sm:right-6 z-[9999] flex flex-col gap-3 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
};
