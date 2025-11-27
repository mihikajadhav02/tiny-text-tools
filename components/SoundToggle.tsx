import React from 'react';
import { getSoundManager } from '@/lib/soundManager';

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  const handleClick = async () => {
    const soundManager = getSoundManager();
    
    // Initialize sound manager on first interaction if needed
    if (!soundManager.isInitialized()) {
      await soundManager.initialize();
    }
    
    // Play click sound before toggling (if currently enabled)
    if (enabled) {
      soundManager.playSound('click');
    }
    
    // Execute the onToggle handler
    onToggle();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Trigger on Enter or Space key
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      
      const soundManager = getSoundManager();
      
      // Initialize sound manager on first interaction if needed
      if (!soundManager.isInitialized()) {
        await soundManager.initialize();
      }
      
      // Play click sound before toggling (if currently enabled)
      if (enabled) {
        soundManager.playSound('click');
      }
      
      // Execute the onToggle handler
      onToggle();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="h-11 px-4 rounded-md border-2 border-button-border bg-button-bg
                 text-text-primary font-typewriter text-sm
                 hover:bg-button-hover hover:border-accent
                 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper
                 transition-colors duration-150
                 shadow-md hover:shadow-lg"
      aria-label={enabled ? 'Mute sounds' : 'Unmute sounds'}
      aria-pressed={enabled}
    >
      {enabled ? '🔊 Sound On' : '🔇 Sound Off'}
    </button>
  );
}
