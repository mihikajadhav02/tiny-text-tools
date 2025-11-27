import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { calculateStats } from '@/lib/textStats';

describe('Page Component - Property-Based Tests', () => {
  describe('Count Operation', () => {
    // Feature: tiny-text-tools, Property 10: Count operation preserves text
    // Validates: Requirements 5.5
    it('should preserve text content when calculating stats', () => {
      fc.assert(
        fc.property(fc.string(), (text) => {
          // Store original text
          const originalText = text;
          
          // Simulate count operation - calculate stats without modifying text
          const stats = calculateStats(text);
          
          // Verify text is unchanged
          expect(text).toBe(originalText);
          
          // Verify stats were calculated (not all zeros unless text is empty)
          if (text.length > 0) {
            expect(stats.totalChars).toBeGreaterThan(0);
          } else {
            expect(stats.totalChars).toBe(0);
          }
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Stats Update', () => {
    // Feature: tiny-text-tools, Property 11: Stats update on text change
    // Validates: Requirements 12.2
    it('should recalculate stats when text changes', () => {
      fc.assert(
        fc.property(fc.string(), fc.string(), (text1, text2) => {
          // Calculate stats for first text
          const stats1 = calculateStats(text1);
          
          // Calculate stats for second text
          const stats2 = calculateStats(text2);
          
          // If texts are different, stats should reflect the current text
          // We verify that stats accurately represent their respective texts
          expect(stats1.totalChars).toBe(text1.length);
          expect(stats2.totalChars).toBe(text2.length);
          
          // If texts are the same, stats should be the same
          if (text1 === text2) {
            expect(stats1).toEqual(stats2);
          }
        }),
        { numRuns: 100 }
      );
    });
  });
});
