import React, { forwardRef } from 'react';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: () => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, onChange, onKeyPress }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Only play sound for keys that modify content (not modifier keys)
    const modifierKeys = ['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'CapsLock', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    
    if (!modifierKeys.includes(e.key) && onKeyPress) {
      onKeyPress();
    }
  };

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className="w-full min-h-[200px] p-4 rounded-lg border-2 border-button-border 
                 bg-white text-text-primary font-typewriter
                 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper focus:border-accent
                 resize-y shadow-md
                 placeholder:text-text-secondary placeholder:opacity-60
                 transition-all duration-150"
      placeholder="Enter or paste your text here..."
      aria-label="Text input area"
    />
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
