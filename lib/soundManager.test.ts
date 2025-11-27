import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { SoundManager } from './soundManager';

describe('SoundManager', () => {
  let soundManager: SoundManager;

  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
      removeItem: vi.fn(),
      length: 0,
      key: vi.fn(),
    };
    global.localStorage = localStorageMock as any;
    
    // Mock AudioContext as a proper class
    class MockAudioContext {
      state = 'running';
      destination = {};
      
      createBufferSource() {
        return {
          buffer: null,
          connect: vi.fn(),
          start: vi.fn(),
        };
      }
      
      async decodeAudioData() {
        return {};
      }
      
      async resume() {
        return undefined;
      }
    }
    
    // Mock window object
    global.window = {
      AudioContext: MockAudioContext,
    } as any;
    
    // Mock AudioContext
    global.AudioContext = MockAudioContext as any;

    // Mock fetch for loading sounds
    global.fetch = vi.fn().mockResolvedValue({
      arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
    }) as any;

    soundManager = new SoundManager();
  });

  describe('Property 12: Sound throttling prevents spam', () => {
    /**
     * Feature: tiny-text-tools, Property 12: Sound throttling prevents spam
     * Validates: Requirements 10.3
     * 
     * For any rapid sequence of key presses, the sound playback function should 
     * limit the number of sounds played to prevent audio overlap
     */
    it('should throttle rapid key sound calls', async () => {
      // Create a fresh sound manager for this test
      const testSoundManager = new SoundManager();
      
      await fc.assert(
        fc.asyncProperty(
          fc.integer({ min: 5, max: 50 }), // Number of rapid calls
          async (numCalls) => {
            // Initialize the sound manager
            await testSoundManager.initialize();
            
            // Ensure sound is enabled
            testSoundManager.setEnabled(true);
            
            // Track all start calls
            const startCalls: any[] = [];
            
            // Mock createBufferSource to track start calls
            const mockCreateBufferSource = vi.fn(() => {
              const mockStart = vi.fn();
              startCalls.push(mockStart);
              return {
                buffer: null,
                connect: vi.fn(),
                start: mockStart,
              };
            });
            
            (testSoundManager as any).audioContext.createBufferSource = mockCreateBufferSource;
            
            // Manually set a buffer so playSound doesn't exit early
            (testSoundManager as any).buffers.set('key', { some: 'buffer' });
            
            // Reset lastPlayTime to ensure first call plays
            (testSoundManager as any).lastPlayTime = 0;
            
            // Make rapid calls to playSound
            for (let i = 0; i < numCalls; i++) {
              testSoundManager.playSound('key');
            }
            
            // Count how many times start was actually called
            const actualPlays = startCalls.filter(fn => fn.mock.calls.length > 0).length;
            
            // With 50ms throttle, we expect significantly fewer plays than calls
            // For rapid calls (no delay), we should get at most 1-2 plays
            expect(actualPlays).toBeLessThan(numCalls);
            expect(actualPlays).toBeGreaterThanOrEqual(1); // At least one should play
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not throttle button click sounds', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.integer({ min: 2, max: 10 }), // Number of clicks
          async (numClicks) => {
            // Initialize the sound manager
            await soundManager.initialize();
            
            // Ensure sound is enabled
            soundManager.setEnabled(true);
            
            // Track all start calls
            const startCalls: any[] = [];
            
            // Mock createBufferSource to track start calls
            const mockCreateBufferSource = vi.fn(() => {
              const mockStart = vi.fn();
              startCalls.push(mockStart);
              return {
                buffer: null,
                connect: vi.fn(),
                start: mockStart,
              };
            });
            
            (soundManager as any).audioContext.createBufferSource = mockCreateBufferSource;
            
            // Manually set a buffer so playSound doesn't exit early
            (soundManager as any).buffers.set('click', { some: 'buffer' });
            
            // Make rapid calls to playSound with 'click'
            for (let i = 0; i < numClicks; i++) {
              soundManager.playSound('click');
            }
            
            // Count how many times start was actually called
            const actualPlays = startCalls.filter(fn => fn.mock.calls.length > 0).length;
            
            // Click sounds should NOT be throttled
            expect(actualPlays).toBe(numClicks);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 13: Modifier keys filtered', () => {
    /**
     * Feature: tiny-text-tools, Property 13: Modifier keys filtered
     * Validates: Requirements 10.5
     * 
     * For any key press event where the key is a modifier (Shift, Control, Alt, Meta), 
     * no typing sound should play
     */
    it('should filter out modifier keys', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'),
          (modifierKey) => {
            // Create a mock keyboard event with a modifier key
            const event = {
              key: modifierKey,
            } as KeyboardEvent;
            
            // Modifier keys should not trigger typing sounds
            const shouldPlay = soundManager.shouldPlayTypingSound(event);
            expect(shouldPlay).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should allow non-modifier keys', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('a', 'b', 'z', '1', '0', ' ', 'Enter', 'Backspace', 'ArrowUp'),
          (normalKey) => {
            // Create a mock keyboard event with a normal key
            const event = {
              key: normalKey,
            } as KeyboardEvent;
            
            // Normal keys should trigger typing sounds
            const shouldPlay = soundManager.shouldPlayTypingSound(event);
            expect(shouldPlay).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
