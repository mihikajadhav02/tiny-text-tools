/**
 * Text statistics utilities for Tiny Text Tools
 */

export interface TextStats {
  totalChars: number;
  charsNoSpace: number;
  wordCount: number;
  lineCount: number;
}

/**
 * Calculates comprehensive text statistics including:
 * - Total character count (including spaces)
 * - Character count excluding spaces
 * - Word count (whitespace-separated tokens)
 * - Line count (newline-separated segments)
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4
 */
export function calculateStats(input: string): TextStats {
  // Handle empty string edge case
  if (input === '') {
    return {
      totalChars: 0,
      charsNoSpace: 0,
      wordCount: 0,
      lineCount: 0,
    };
  }

  // Total characters including spaces
  const totalChars = input.length;

  // Characters without any whitespace
  const charsNoSpace = input.replace(/\s/g, '').length;

  // Word count: split by whitespace and filter out empty strings
  const wordCount = input
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // Line count: split by newlines
  const lineCount = input.split('\n').length;

  return {
    totalChars,
    charsNoSpace,
    wordCount,
    lineCount,
  };
}
