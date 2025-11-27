import React from 'react';
import { getSoundManager } from '@/lib/soundManager';

interface ToolButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function ToolButton({ label, onClick, disabled = false }: ToolButtonProps) {
  const handleClick = async () => {
    const soundManager = getSoundManager();
    
    // Initialize sound manager on first interaction
    if (!soundManager.isInitialized()) {
      await soundManager.initialize();
    }
    
    // Play click sound
    soundManager.playSound('click');
    
    // Execute the onClick handler
    onClick();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Trigger on Enter or Space key
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      
      const soundManager = getSoundManager();
      
      // Initialize sound manager on first interaction
      if (!soundManager.isInitialized()) {
        await soundManager.initialize();
      }
      
      // Play click sound
      soundManager.playSound('click');
      
      // Execute the onClick handler
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className="h-20 px-8 rounded-md border-2 border-button-border bg-button-bg
                 text-text-primary font-typewriter font-bold
                 hover:bg-button-hover hover:border-accent
                 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors duration-150
                 shadow-md hover:shadow-lg"
      aria-label={label}
    >
      {label}
    </button>
  );
}
