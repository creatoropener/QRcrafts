import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white text-[13px] font-medium py-2.5 px-5 rounded-full shadow-lg pointer-events-none transition-transform duration-300">
      {message}
    </div>
  );
};
