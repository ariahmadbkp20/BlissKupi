import React from 'react';
import { HeartIcon, TrashIcon, CheckCircleIcon } from './IconComponents';

export type ToastType = 'favorite' | 'cart-remove' | 'success';

interface ToastProps {
  message: string;
  type: ToastType;
  show: boolean;
}

const iconMap: Record<ToastType, React.ReactNode> = {
    favorite: <HeartIcon className="w-5 h-5 text-pink-400"/>,
    'cart-remove': <TrashIcon className="w-5 h-5 text-red-400"/>,
    success: <CheckCircleIcon className="w-5 h-5 text-green-400"/>,
};

export const Toast: React.FC<ToastProps> = ({ message, type, show }) => {
  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-stone-800 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 ease-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}
      role="alert"
      aria-live="assertive"
    >
      {iconMap[type] || null}
      <span className="font-semibold">{message}</span>
    </div>
  );
};