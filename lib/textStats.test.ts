import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { calculateStats } from './textStats';

describe('Text Statistics - Property-Based Tests', () => {
  describe('calculateStats', () => {
    // Feature: tiny-text-tools, Property 7: Character count accuracy
    // Validates: Requirements 5.1, 5.2
    it('should accurately count total characters and characters without spaces', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const stats = calculateStats(input);
          
          // Total chars should equal string length
          expect(stats.totalChars).toBe(input.length);
          
          // Chars without spaces should equal length after removing all whitespace
          const expectedCharsNoSpace = input.replace(/\s/g, '').length;
          expect(stats.charsNoSpace).toBe(expectedCharsNoSpace);
          
          // Chars without spaces should be <= total chars
          expect(stats.charsNoSpace).toBeLessThanOrEqual(stats.totalChars);
        }),
        { numRuns: 100 }
      );
    });

    // Feature: tiny-text-tools, Property 8: Word count accuracy
    // Validates: Requirements 5.3
    it('should accurately count words separated by whitespace', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const stats = calculateStats(input);
          
          // Calculate expected word count
          const expectedWordCount = input
            .trim()
            .split(/\s+/)
            .filter(word => word.length > 0).length;
          
          expect(stats.wordCount).toBe(expectedWordCount);
          
          // Word count should be <= total chars (can't have more words than characters)
          expect(stats.wordCount).toBeLessThanOrEqual(stats.totalChars);
        }),
        { numRuns: 100 }
      );
    });

    // Feature: tiny-text-tools, Property 9: Line count accuracy
    // Validates: Requirements 5.4
    it('should accurately count lines separated by newlines', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const stats = calculateStats(input);
          
          // Calculate expected line count
          // Empty string should have 0 lines, non-empty strings split by '\n'
          const expectedLineCount = input === '' ? 0 : input.split('\n').length;
          
          expect(stats.lineCount).toBe(expectedLineCount);
          
          // Line count should be >= 1 for non-empty strings
          if (input.length > 0) {
            expect(stats.lineCount).toBeGreaterThanOrEqual(1);
          } else {
            // Empty string should have 0 lines
            expect(stats.lineCount).toBe(0);
          }
        }),
        { numRuns: 100 }
      );
    });
  });
});
