/**
 * SoundManager handles audio playback for typewriter sounds
 * Uses Web Audio API for better performance and control
 */
export class SoundManager {
  private audioContext: AudioContext | null = null;
  private buffers: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = true;
  private lastPlayTime: number = 0;
  private throttleMs: number = 50;
  private initialized: boolean = false;

  constructor() {
    // Load sound preference from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('tinyTextTools_soundEnabled');
      this.enabled = stored === null ? true : stored === 'true';
    }
  }

  /**
   * Initialize AudioContext and load sound files
   * Must be called after user interaction due to browser autoplay policies
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Create AudioContext
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume if suspended (browser autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Load sound files
      await this.loadSounds();
      this.initialized = true;
    } catch (error) {
      console.warn('Failed to initialize audio:', error);
      // Continue without audio - app should still function
    }
  }

  /**
   * Load audio files from public/sounds directory
   */
  private async loadSounds(): Promise<void> {
    if (!this.audioContext) return;

    const sounds = [
      { name: 'key', path: '/sounds/typewriter-key.mp3' },
      { name: 'click', path: '/sounds/typewriter-click.mp3' }
    ];

    try {
      await Promise.all(
        sounds.map(async ({ name, path }) => {
          try {
            const response = await fetch(path);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
            this.buffers.set(name, audioBuffer);
          } catch (error) {
            console.warn(`Failed to load sound: ${name}`, error);
          }
        })
      );
    } catch (error) {
      console.warn('Failed to load sounds:', error);
    }
  }

  /**
   * Play a sound with throttling to prevent audio spam
   * @param soundName - Name of the sound to play ('key' or 'click')
   */
  playSound(soundName: string): void {
    if (!this.enabled || !this.audioContext || !this.initialized) {
      return;
    }

    const buffer = this.buffers.get(soundName);
    if (!buffer) {
      return;
    }

    // Throttle typing sounds only (not button clicks)
    if (soundName === 'key') {
      const now = Date.now();
      if (now - this.lastPlayTime < this.throttleMs) {
        return;
      }
      this.lastPlayTime = now;
    }

    try {
      // Create source and connect to destination
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start(0);
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }

  /**
   * Enable or disable sound playback
   * Persists preference to localStorage
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('tinyTextTools_soundEnabled', String(enabled));
    }
  }

  /**
   * Get current enabled state
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Check if sound manager is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Check if a keyboard event should trigger a typing sound
   * Filters out modifier keys (Shift, Control, Alt, Meta)
   * @param event - Keyboard event to check
   * @returns true if sound should play, false otherwise
   */
  shouldPlayTypingSound(event: KeyboardEvent): boolean {
    // Filter out modifier keys
    const modifierKeys = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'];
    return !modifierKeys.includes(event.key);
  }
}

// Export singleton instance
let soundManagerInstance: SoundManager | null = null;

export function getSoundManager(): SoundManager {
  if (!soundManagerInstance) {
    soundManagerInstance = new SoundManager();
  }
  return soundManagerInstance;
}
