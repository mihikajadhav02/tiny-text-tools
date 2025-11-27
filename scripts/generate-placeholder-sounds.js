#!/usr/bin/env node

/**
 * Generate minimal valid MP3 placeholder files for typewriter sounds
 * These are silent MP3 files that can be loaded by the Web Audio API
 */

const fs = require('fs');
const path = require('path');

// Minimal valid MP3 file (silent, very short duration)
// This is a valid MP3 frame with LAME encoder tag
const minimalMP3 = Buffer.from(
  '//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADhAC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7v////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAA4T8FkhyAAAAAAAAAAAAAAAAAAAA//uQxAAACwABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uQxDSAAADSAAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==',
  'base64'
);

const soundsDir = path.join(__dirname, '..', 'public', 'sounds');

// Ensure directory exists
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// Create typewriter-key.mp3
const keyPath = path.join(soundsDir, 'typewriter-key.mp3');
fs.writeFileSync(keyPath, minimalMP3);
console.log('✓ Created typewriter-key.mp3');

// Create typewriter-click.mp3
const clickPath = path.join(soundsDir, 'typewriter-click.mp3');
fs.writeFileSync(clickPath, minimalMP3);
console.log('✓ Created typewriter-click.mp3');

console.log('\nPlaceholder MP3 files created successfully!');
console.log('Note: These are silent placeholder files.');
console.log('Replace them with actual typewriter sounds for the full experience.');
