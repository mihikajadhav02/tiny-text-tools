'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import TextArea from '@/components/TextArea';
import ToolButtonGroup from '@/components/ToolButtonGroup';
import StatsPanel from '@/components/StatsPanel';
import ActionButtons from '@/components/ActionButtons';
import FeedbackToast from '@/components/FeedbackToast';
import SoundToggle from '@/components/SoundToggle';
import { removeExtraSpaces, toTitleCase, toSnakeCase, reverseText } from '@/lib/transformations';
import { calculateStats, TextStats } from '@/lib/textStats';
import { getSoundManager } from '@/lib/soundManager';

export default function Home() {
  // Ref for textarea focus management
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // State management
  const [text, setText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    totalChars: 0,
    charsNoSpace: 0,
    wordCount: 0,
    lineCount: 0,
  });
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize sound manager and load sound preference
  useEffect(() => {
    const soundManager = getSoundManager();
    setSoundEnabled(soundManager.isEnabled());
  }, []);

  // Automatically calculate stats when text changes
  useEffect(() => {
    setStats(calculateStats(text));
  }, [text]);

  // Transformation button handlers - memoized for performance
  const handleRemoveSpaces = useCallback(() => {
    setText(removeExtraSpaces(text));
  }, [text]);

  const handleTitleCase = useCallback(() => {
    setText(toTitleCase(text));
  }, [text]);

  const handleSnakeCase = useCallback(() => {
    setText(toSnakeCase(text));
  }, [text]);



  const handleReverse = useCallback(() => {
    setText(reverseText(text));
  }, [text]);

  // Copy button handler with clipboard API - memoized for performance
  const handleCopy = useCallback(async () => {
    try {
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        alert('Copy not supported in this browser');
        return;
      }

      // Copy text to clipboard
      await navigator.clipboard.writeText(text);
      
      // Show feedback toast
      setCopied(true);
      
      // Hide toast after 1.5 seconds
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Unable to copy. Please check browser permissions.');
    }
  }, [text]);

  // Clear button handler - memoized for performance
  const handleClear = useCallback(() => {
    setText('');
    // Stats will automatically reset to zeros via useEffect
    
    // Return focus to textarea after clearing
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  // Sound toggle handler - memoized for performance
  const handleSoundToggle = useCallback(() => {
    const soundManager = getSoundManager();
    const newState = !soundEnabled;
    soundManager.setEnabled(newState);
    setSoundEnabled(newState);
  }, [soundEnabled]);

  // Typing sound handler - memoized for performance
  const handleKeyPress = useCallback(async () => {
    const soundManager = getSoundManager();
    
    // Initialize sound manager on first interaction (preloads audio files)
    if (!soundManager.isInitialized()) {
      await soundManager.initialize();
    }
    
    // Play typing sound
    soundManager.playSound('key');
  }, []);

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-paper">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-text-primary font-typewriter">
          Tiny Text Tools
        </h1>
        <p className="text-center text-text-secondary mb-6 sm:mb-8 font-typewriter">
          4 tiny utilities to clean and transform your text
        </p>
        
        {/* Text Area */}
        <div className="mb-6">
          <TextArea
            ref={textAreaRef}
            value={text}
            onChange={setText}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* Tool Buttons */}
        <div className="mb-6">
          <ToolButtonGroup
            onRemoveSpaces={handleRemoveSpaces}
            onTitleCase={handleTitleCase}
            onSnakeCase={handleSnakeCase}
            onReverse={handleReverse}
          />
        </div>

        {/* Stats Panel */}
        <div className="mb-6">
          <StatsPanel stats={stats} />
        </div>

        {/* Action Buttons and Sound Toggle */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center justify-between">
          <ActionButtons
            onCopy={handleCopy}
            onClear={handleClear}
          />
          <SoundToggle
            enabled={soundEnabled}
            onToggle={handleSoundToggle}
          />
        </div>

        {/* Feedback Toast */}
        <FeedbackToast
          visible={copied}
          message="Copied!"
        />
      </div>
    </main>
  );
}
