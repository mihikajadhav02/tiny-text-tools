import { describe, it, expect } from 'vitest';
import { removeExtraSpaces, toTitleCase, toSnakeCase, reverseText } from './transformations';
import { calculateStats } from './textStats';

/**
 * Edge case tests for empty textarea interactions
 * Requirements: 2.5, 3.4, 4.6, 6.3, 7.4, 12.3
 */
describe('Empty String Edge Cases', () => {
  describe('Transformations with empty strings', () => {
    it('removeExtraSpaces should handle empty string', () => {
      expect(removeExtraSpaces('')).toBe('');
    });

    it('toTitleCase should handle empty string', () => {
      expect(toTitleCase('')).toBe('');
    });

    it('toSnakeCase should handle empty string', () => {
      expect(toSnakeCase('')).toBe('');
    });

    it('reverseText should handle empty string', () => {
      expect(reverseText('')).toBe('');
    });
  });

  describe('Statistics with empty string', () => {
    it('calculateStats should return all zeros for empty string', () => {
      const stats = calculateStats('');
      
      expect(stats.totalChars).toBe(0);
      expect(stats.charsNoSpace).toBe(0);
      expect(stats.wordCount).toBe(0);
      expect(stats.lineCount).toBe(0);
    });
  });

  describe('Whitespace-only strings', () => {
    it('removeExtraSpaces should handle whitespace-only string', () => {
      expect(removeExtraSpaces('   ')).toBe('');
      expect(removeExtraSpaces('\n\n\n')).toBe('');
      expect(removeExtraSpaces('  \n  \n  ')).toBe('');
    });

    it('toTitleCase should handle whitespace-only string', () => {
      const result = toTitleCase('   ');
      // Should preserve whitespace structure
      expect(result).toMatch(/^\s+$/);
    });

    it('toSnakeCase should handle whitespace-only string', () => {
      expect(toSnakeCase('   ')).toBe('');
      expect(toSnakeCase('\n\n')).toBe('');
    });

    it('calculateStats should handle whitespace-only string', () => {
      const stats = calculateStats('   ');
      
      expect(stats.totalChars).toBe(3);
      expect(stats.charsNoSpace).toBe(0);
      expect(stats.wordCount).toBe(0);
    });
  });
});
