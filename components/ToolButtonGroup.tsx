import React from 'react';
import ToolButton from './ToolButton';

interface ToolButtonGroupProps {
  onRemoveSpaces: () => void;
  onTitleCase: () => void;
  onSnakeCase: () => void;
  onReverse: () => void;
  disabled?: boolean;
}

export default function ToolButtonGroup({
  onRemoveSpaces,
  onTitleCase,
  onSnakeCase,
  onReverse,
  disabled = false,
}: ToolButtonGroupProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ToolButton
        label="Remove extra spaces"
        onClick={onRemoveSpaces}
        disabled={disabled}
      />
      <ToolButton
        label="Title Case"
        onClick={onTitleCase}
        disabled={disabled}
      />
      <ToolButton
        label="snake_case"
        onClick={onSnakeCase}
        disabled={disabled}
      />
      <ToolButton
        label="Reverse"
        onClick={onReverse}
        disabled={disabled}
      />
    </div>
  );
}
