/**
 * Text transformation utilities for Tiny Text Tools
 */

/**
 * Removes extra spaces from text by:
 * - Trimming leading/trailing whitespace
 * - Replacing multiple consecutive spaces with a single space
 * - Replacing multiple consecutive newlines with a single newline
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */
export function removeExtraSpaces(input: string): string {
  if (input === '') return '';
  
  return input
    .trim() // Remove leading/trailing whitespace
    .replace(/\n\n+/g, '\n') // Replace multiple newlines with single newline
    .replace(/ {2,}/g, ' '); // Replace multiple spaces with single space
}

/**
 * Converts text to Title Case by capitalizing the first character of each word
 * and converting all other characters to lowercase.
 * Words are separated by whitespace.
 * 
 * Requirements: 3.1, 3.2, 3.3
 */
export function toTitleCase(input: string): string {
  if (input === '') return '';
  
  return input
    .split(/(\s+)/) // Split by whitespace but keep separators
    .map(word => {
      if (word.match(/^\s+$/)) return word; // Keep whitespace as-is
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

/**
 * Converts text to snake_case by:
 * - Converting all alphabetic characters to lowercase
 * - Replacing whitespace sequences with single underscores
 * - Removing non-alphanumeric characters except underscores and numbers
 * - Collapsing multiple underscores to single underscore
 * - Trimming leading/trailing underscores
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */
export function toSnakeCase(input: string): string {
  if (input === '') return '';
  
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '_') // Replace whitespace sequences with underscore
    .replace(/[^a-z0-9_]/g, '') // Remove non-alphanumeric except underscores and numbers
    .replace(/_+/g, '_') // Collapse multiple underscores
    .replace(/^_+|_+$/g, ''); // Trim leading/trailing underscores
}

/**
 * Reverses text character-by-character while preserving Unicode characters.
 * Uses Array.from to handle multi-byte Unicode characters correctly.
 * 
 * Requirements: 6.1, 6.2
 */
export function reverseText(input: string): string {
  return Array.from(input).reverse().join('');
}
