import React from 'react';
import { getSoundManager } from '@/lib/soundManager';

interface ActionButtonsProps {
  onCopy: () => void;
  onClear: () => void;
  disabled?: boolean;
}

export default function ActionButtons({ onCopy, onClear, disabled = false }: ActionButtonsProps) {
  const handleCopy = async () => {
    const soundManager = getSoundManager();
    
    // Initialize sound manager on first interaction
    if (!soundManager.isInitialized()) {
      await soundManager.initialize();
    }
    
    // Play click sound
    soundManager.playSound('click');
    
    // Execute the onCopy handler
    onCopy();
  };

  const handleClear = async () => {
    const soundManager = getSoundManager();
    
    // Initialize sound manager on first interaction
    if (!soundManager.isInitialized()) {
      await soundManager.initialize();
    }
    
    // Play click sound
    soundManager.playSound('click');
    
    // Execute the onClear handler
    onClear();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLButtonElement>, action: 'copy' | 'clear') => {
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
      
      // Execute the appropriate handler
      if (action === 'copy') {
        onCopy();
      } else {
        onClear();
      }
    }
  };

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={handleCopy}
        onKeyDown={(e) => handleKeyDown(e, 'copy')}
        disabled={disabled}
        className="h-11 px-6 rounded-md border-2 border-accent bg-button-bg
                   text-text-primary font-typewriter
                   hover:bg-accent hover:text-white hover:border-accent
                   focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-150
                   shadow-md hover:shadow-lg"
        aria-label="Copy result to clipboard"
      >
        Copy Result
      </button>
      
      <button
        onClick={handleClear}
        onKeyDown={(e) => handleKeyDown(e, 'clear')}
        disabled={disabled}
        className="h-11 px-6 rounded-md border-2 border-button-border bg-button-bg
                   text-text-primary font-typewriter
                   hover:bg-button-hover hover:border-text-secondary
                   focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-150
                   shadow-md hover:shadow-lg"
        aria-label="Clear all text"
      >
        Clear
      </button>
    </div>
  );
}
