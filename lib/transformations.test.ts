import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { removeExtraSpaces, toTitleCase, toSnakeCase, reverseText } from './transformations';

describe('Transformation Functions - Property-Based Tests', () => {
  describe('removeExtraSpaces', () => {
    // Feature: tiny-text-tools, Property 1: Remove extra spaces normalization
    // Validates: Requirements 2.1, 2.2, 2.3, 2.4
    it('should normalize whitespace: no leading/trailing, no consecutive spaces or newlines', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const result = removeExtraSpaces(input);
          
          // No leading whitespace
          if (result.length > 0) {
            expect(result[0]).not.toMatch(/\s/);
          }
          
          // No trailing whitespace
          if (result.length > 0) {
            expect(result[result.length - 1]).not.toMatch(/\s/);
          }
          
          // No consecutive spaces
          expect(result).not.toMatch(/  /);
          
          // No consecutive newlines
          expect(result).not.toMatch(/\n\n/);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('toTitleCase', () => {
    // Feature: tiny-text-tools, Property 2: Title case format
    // Validates: Requirements 3.1, 3.2, 3.3
    it('should capitalize first character of each word and lowercase the rest', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const result = toTitleCase(input);
          
          // Split by whitespace to get words
          const words = result.split(/\s+/).filter(w => w.length > 0);
          
          for (const word of words) {
            if (word.length > 0) {
              // First character should be uppercase (if it's a letter)
              const firstChar = word[0];
              if (firstChar.match(/[a-zA-Z]/)) {
                expect(firstChar).toBe(firstChar.toUpperCase());
              }
              
              // Remaining characters should be lowercase (if they're letters)
              for (let i = 1; i < word.length; i++) {
                const char = word[i];
                if (char.match(/[a-zA-Z]/)) {
                  expect(char).toBe(char.toLowerCase());
                }
              }
            }
          }
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('toSnakeCase', () => {
    // Feature: tiny-text-tools, Property 3: Snake case lowercase conversion
    // Validates: Requirements 4.1
    it('should convert all alphabetic characters to lowercase', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const result = toSnakeCase(input);
          
          // Check that all alphabetic characters are lowercase
          for (const char of result) {
            if (char.match(/[a-zA-Z]/)) {
              expect(char).toBe(char.toLowerCase());
            }
          }
        }),
        { numRuns: 100 }
      );
    });

    // Feature: tiny-text-tools, Property 4: Snake case whitespace replacement
    // Validates: Requirements 4.2, 4.3
    it('should replace all whitespace sequences with single underscores', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const result = toSnakeCase(input);
          
          // Result should not contain any whitespace
          expect(result).not.toMatch(/\s/);
          
          // If input had whitespace between alphanumeric chars, result should have underscores
          // We can verify no consecutive underscores exist (they should be collapsed)
          expect(result).not.toMatch(/__/);
        }),
        { numRuns: 100 }
      );
    });

    // Feature: tiny-text-tools, Property 5: Snake case character filtering
    // Validates: Requirements 4.4, 4.5
    it('should preserve only alphanumeric characters, underscores, and numbers', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const result = toSnakeCase(input);
          
          // Every character in result should be lowercase letter, digit, or underscore
          for (const char of result) {
            expect(char).toMatch(/[a-z0-9_]/);
          }
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('reverseText', () => {
    // Feature: tiny-text-tools, Property 6: Reverse text round trip
    // Validates: Requirements 6.1, 6.2
    it('should return original string when reversed twice', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const reversed = reverseText(input);
          const roundTrip = reverseText(reversed);
          
          expect(roundTrip).toBe(input);
        }),
        { numRuns: 100 }
      );
    });
  });
});
