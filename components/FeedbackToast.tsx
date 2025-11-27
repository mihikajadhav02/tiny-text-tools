import React from 'react';

interface FeedbackToastProps {
  visible: boolean;
  message: string;
}

export default function FeedbackToast({ visible, message }: FeedbackToastProps) {
  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2
                 px-6 py-3 rounded-lg
                 bg-accent text-white font-typewriter font-bold
                 shadow-lg
                 animate-fade-in
                 z-50"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
