import { describe, it, expect } from 'vitest';
import { removeExtraSpaces, toTitleCase, toSnakeCase, reverseText } from './transformations';
import { calculateStats } from './textStats';

describe('Performance Tests', () => {
  // Generate large text input (10,000+ characters)
  const generateLargeText = (size: number): string => {
    const words = ['hello', 'world', 'test', 'performance', 'large', 'text', 'input'];
    let text = '';
    while (text.length < size) {
      text += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return text.slice(0, size);
  };

  it('should handle 10,000 character text with removeExtraSpaces', () => {
    const largeText = generateLargeText(10000);
    const start = performance.now();
    const result = removeExtraSpaces(largeText);
    const end = performance.now();
    
    expect(result).toBeDefined();
    expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
  });

  it('should handle 10,000 character text with toTitleCase', () => {
    const largeText = generateLargeText(10000);
    const start = performance.now();
    const result = toTitleCase(largeText);
    const end = performance.now();
    
    expect(result).toBeDefined();
    expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
  });

  it('should handle 10,000 character text with toSnakeCase', () => {
    const largeText = generateLargeText(10000);
    const start = performance.now();
    const result = toSnakeCase(largeText);
    const end = performance.now();
    
    expect(result).toBeDefined();
    expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
  });

  it('should handle 10,000 character text with reverseText', () => {
    const largeText = generateLargeText(10000);
    const start = performance.now();
    const result = reverseText(largeText);
    const end = performance.now();
    
    expect(result).toBeDefined();
    expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
  });

  it('should handle 10,000 character text with calculateStats', () => {
    const largeText = generateLargeText(10000);
    const start = performance.now();
    const result = calculateStats(largeText);
    const end = performance.now();
    
    expect(result).toBeDefined();
    expect(result.totalChars).toBeGreaterThan(0);
    expect(end - start).toBeLessThan(50); // Stats calculation should be very fast
  });

  it('should handle 50,000 character text efficiently', () => {
    const veryLargeText = generateLargeText(50000);
    
    // Test all transformations with very large text
    const start1 = performance.now();
    removeExtraSpaces(veryLargeText);
    const end1 = performance.now();
    
    const start2 = performance.now();
    toTitleCase(veryLargeText);
    const end2 = performance.now();
    
    const start3 = performance.now();
    toSnakeCase(veryLargeText);
    const end3 = performance.now();
    
    const start4 = performance.now();
    reverseText(veryLargeText);
    const end4 = performance.now();
    
    const start5 = performance.now();
    calculateStats(veryLargeText);
    const end5 = performance.now();
    
    // All operations should complete in reasonable time
    expect(end1 - start1).toBeLessThan(500);
    expect(end2 - start2).toBeLessThan(500);
    expect(end3 - start3).toBeLessThan(500);
    expect(end4 - start4).toBeLessThan(500);
    expect(end5 - start5).toBeLessThan(200);
  });
});
