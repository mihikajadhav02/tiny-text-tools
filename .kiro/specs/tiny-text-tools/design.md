# Design Document

## Overview

Tiny Text Tools is a client-side single-page application built with Next.js 14+ using the App Router, TypeScript, and TailwindCSS. The application provides five text transformation utilities with a typewriter-inspired aesthetic and sound design. All processing occurs in the browser with no backend dependencies, making it deployable as a static site on Vercel's free tier.

## Architecture

### Application Structure

The application follows a simple component-based architecture:

```
app/
├── layout.tsx          # Root layout with font configuration
├── page.tsx            # Main application page
├── globals.css         # Global styles and Tailwind configuration
components/
├── TextArea.tsx        # Controlled textarea component
├── ToolButtonGroup.tsx # Container for transformation buttons
├── ToolButton.tsx      # Individual tool button
├── StatsPanel.tsx      # Statistics display
├── ActionButtons.tsx   # Copy and Clear buttons
├── FeedbackToast.tsx   # "Copied!" notification
└── SoundToggle.tsx     # Mute/unmute control
lib/
├── transformations.ts  # Pure transformation functions
├── textStats.ts        # Statistics calculation functions
└── soundManager.ts     # Audio playback utilities
public/
└── sounds/
    ├── typewriter-key.mp3
    └── typewriter-click.mp3
```

### Technology Decisions

- **Next.js 14+ with App Router**: Provides optimal static site generation, built-in font optimization, and modern React features
- **TypeScript**: Ensures type safety for transformation functions and component props
- **TailwindCSS**: Enables rapid styling with utility classes while maintaining consistency
- **React Hooks**: useState for state management, useCallback for memoized functions, useEffect for side effects
- **Web Audio API**: Provides fine-grained control over sound playback with better performance than HTMLAudioElement

## Components and Interfaces

### Core State Interface

```typescript
interface AppState {
  text: string;
  stats: TextStats;
  copied: boolean;
  soundEnabled: boolean;
}

interface TextStats {
  totalChars: number;
  charsNoSpace: number;
  wordCount: number;
  lineCount: number;
}
```

### Component Specifications

#### TextArea Component
- **Props**: `value: string`, `onChange: (value: string) => void`, `onKeyPress: () => void`
- **Behavior**: Controlled component that triggers sound on valid key presses
- **Styling**: Typewriter font, paper-like background, comfortable height (min 200px)

#### ToolButton Component
- **Props**: `label: string`, `onClick: () => void`, `disabled: boolean`
- **Behavior**: Triggers transformation and plays click sound
- **Styling**: Rounded corners, subtle shadow, hover effects, keyboard focus indicators

#### StatsPanel Component
- **Props**: `stats: TextStats`
- **Behavior**: Displays four statistics in a grid or row layout
- **Styling**: Consistent with typewriter aesthetic, clear labels

#### ActionButtons Component
- **Props**: `onCopy: () => void`, `onClear: () => void`, `disabled: boolean`
- **Behavior**: Handles copy and clear operations with sound feedback
- **Styling**: Distinct from tool buttons, clearly labeled

#### FeedbackToast Component
- **Props**: `visible: boolean`, `message: string`
- **Behavior**: Appears for 1.5-2 seconds after copy operation
- **Styling**: Non-intrusive, positioned near copy button or bottom of interface

#### SoundToggle Component
- **Props**: `enabled: boolean`, `onToggle: () => void`
- **Behavior**: Toggles sound on/off, persists preference to localStorage
- **Styling**: Small, unobtrusive icon button

## Data Models

### Transformation Functions

All transformation functions follow this signature:
```typescript
type TransformFunction = (input: string) => string;
```

#### removeExtraSpaces
- Trim leading/trailing whitespace
- Replace multiple spaces with single space using regex: `/\s+/g` → `' '`
- Replace multiple newlines with single newline using regex: `/\n\n+/g` → `'\n'`

#### toTitleCase
- Split text by whitespace
- For each word: capitalize first character, lowercase remaining characters
- Join with original separators preserved

#### toSnakeCase
- Convert to lowercase
- Replace whitespace sequences with single underscore
- Remove non-alphanumeric characters except underscores and digits using regex: `/[^a-z0-9_]/g`
- Collapse multiple underscores to single underscore
- Trim leading/trailing underscores

#### reverseText
- Use `Array.from(input).reverse().join('')` to handle Unicode correctly

#### calculateStats
- Total chars: `input.length`
- Chars without spaces: `input.replace(/\s/g, '').length`
- Word count: `input.trim().split(/\s+/).filter(w => w.length > 0).length`
- Line count: `input.split('\n').length`

## Data Flow

1. **User Input**: User types or pastes text into TextArea
   - Text state updates via onChange handler
   - Stats automatically recalculate
   - Typing sound plays (throttled)

2. **Transformation**: User clicks a tool button
   - Transformation function processes current text
   - Text state updates with result
   - Stats automatically recalculate
   - Click sound plays

3. **Count Operation**: User clicks Count button
   - Stats recalculate (already happening automatically)
   - No text modification occurs
   - Click sound plays

4. **Copy Operation**: User clicks Copy button
   - Current text copied to clipboard via `navigator.clipboard.writeText()`
   - Copied state set to true
   - Feedback toast appears
   - After 1.5s, copied state resets to false
   - Click sound plays

5. **Clear Operation**: User clicks Clear button
   - Text state set to empty string
   - Stats reset to zeros
   - Click sound plays

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Transformation Properties

Property 1: Remove extra spaces normalization
*For any* string input, applying removeExtraSpaces should result in text with no leading/trailing whitespace, no consecutive spaces, and no consecutive newlines
**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

Property 2: Title case format
*For any* string input, applying toTitleCase should result in each word starting with an uppercase letter followed by lowercase letters, where words are separated by whitespace
**Validates: Requirements 3.1, 3.2, 3.3**

Property 3: Snake case lowercase conversion
*For any* string input, applying toSnakeCase should result in all alphabetic characters being lowercase
**Validates: Requirements 4.1**

Property 4: Snake case whitespace replacement
*For any* string input with whitespace, applying toSnakeCase should replace all whitespace sequences with single underscores
**Validates: Requirements 4.2, 4.3**

Property 5: Snake case character filtering
*For any* string input, applying toSnakeCase should preserve only alphanumeric characters, underscores, and numbers while removing all other characters
**Validates: Requirements 4.4, 4.5**

Property 6: Reverse text round trip
*For any* string input, applying reverseText twice should return the original string (reverseText(reverseText(x)) === x)
**Validates: Requirements 6.1, 6.2**

Property 7: Character count accuracy
*For any* string input, calculateStats should return totalChars equal to the string length and charsNoSpace equal to the length after removing all whitespace
**Validates: Requirements 5.1, 5.2**

Property 8: Word count accuracy
*For any* string input, calculateStats should return wordCount equal to the number of whitespace-separated non-empty tokens
**Validates: Requirements 5.3**

Property 9: Line count accuracy
*For any* string input, calculateStats should return lineCount equal to the number of newline-separated segments
**Validates: Requirements 5.4**

Property 10: Count operation preserves text
*For any* text state, triggering the count operation should not modify the text content
**Validates: Requirements 5.5**

Property 11: Stats update on text change
*For any* text change, the stats should automatically recalculate to reflect the new text content
**Validates: Requirements 12.2**

### UI Interaction Properties

Property 12: Sound throttling prevents spam
*For any* rapid sequence of key presses, the sound playback function should limit the number of sounds played to prevent audio overlap
**Validates: Requirements 10.3**

Property 13: Modifier keys filtered
*For any* key press event where the key is a modifier (Shift, Control, Alt, Meta), no typing sound should play
**Validates: Requirements 10.5**

### Edge Cases

The following edge cases will be handled by the property test generators to ensure robust behavior:

- Empty string inputs (Requirements 2.5, 3.4, 4.6, 6.3, 12.3)
- Strings with only whitespace
- Strings with special Unicode characters
- Very long strings
- Strings with mixed line endings (\\n, \\r\\n)

## Error Handling

### Input Validation

- **Empty Text Area**: All transformation functions handle empty strings gracefully by returning empty strings
- **Invalid Characters**: Snake case transformation filters invalid characters rather than throwing errors
- **Unicode Support**: All transformations use Unicode-aware string operations (Array.from for reverse, proper regex for whitespace)

### Clipboard Operations

- **Permission Denied**: If clipboard access is denied, show error message: "Unable to copy. Please check browser permissions."
- **Unsupported Browser**: Check for `navigator.clipboard` availability, fallback to showing message: "Copy not supported in this browser"

### Audio Playback

- **Audio Load Failure**: If sound files fail to load, application continues to function without audio
- **Autoplay Blocked**: Respect browser autoplay policies by only playing sounds after user interaction
- **Audio Context Suspended**: Resume AudioContext on first user interaction

### Browser Compatibility

- **LocalStorage Unavailable**: If localStorage is blocked, sound preference defaults to enabled without persistence
- **Older Browsers**: Provide graceful degradation for missing APIs (clipboard, audio)

## Testing Strategy

### Unit Testing

Unit tests will verify specific examples and edge cases using Vitest as the testing framework:

- **Transformation Functions**: Test each transformation with specific examples
  - Empty strings return empty strings
  - Single word inputs
  - Multi-word inputs with various spacing
  - Special characters and Unicode
  - Boundary cases (very long strings, only whitespace)

- **Stats Calculation**: Test calculateStats with known inputs
  - Empty string returns all zeros
  - Single character, word, line
  - Multiple lines with varying content

- **Component Behavior**: Test React components with React Testing Library
  - Button click handlers trigger correct functions
  - TextArea updates state on change
  - FeedbackToast appears and disappears on timer
  - Clear button resets state

### Property-Based Testing

Property-based tests will verify universal properties using fast-check library for JavaScript/TypeScript. Each test will run a minimum of 100 iterations with randomly generated inputs.

**Test Configuration**:
- Library: fast-check
- Minimum iterations: 100 per property
- Each property test must include a comment tag: `// Feature: tiny-text-tools, Property {number}: {property_text}`

**Property Test Specifications**:

1. **Transformation Idempotence**: Some transformations should be idempotent
   - removeExtraSpaces(removeExtraSpaces(x)) === removeExtraSpaces(x)
   - toTitleCase(toTitleCase(x)) === toTitleCase(x)
   - toSnakeCase(toSnakeCase(x)) === toSnakeCase(x)

2. **Reverse Round Trip**: Validates Property 6
   - reverseText(reverseText(x)) === x for all strings

3. **Stats Consistency**: Validates Properties 7, 8, 9
   - totalChars >= charsNoSpace for all strings
   - wordCount <= totalChars for all strings
   - lineCount >= 1 for non-empty strings

4. **Character Preservation**: Validates Properties 1, 6
   - Length relationships after transformations
   - No characters added that weren't in input (except underscores in snake_case)

5. **Sound Throttling**: Validates Property 12
   - Rapid calls to playSound should result in fewer actual audio plays than calls

**Generator Strategies**:
- Use fast-check's string generators with various character sets
- Generate strings with controlled whitespace patterns
- Generate strings with Unicode characters
- Generate edge cases (empty, very long, only whitespace)

### Integration Testing

Integration tests will verify end-to-end user flows:
- Type text → transform → verify result in textarea
- Type text → count → verify stats display
- Transform text → copy → verify clipboard (with mock)
- Clear → verify empty state

### Manual Testing Checklist

- Visual design matches typewriter aesthetic
- Sounds play appropriately and can be muted
- Keyboard navigation works smoothly
- Responsive layout on mobile devices
- Performance with very large text inputs

## Typography and Visual Design

### Font Selection

**Primary Font**: "Courier Prime"
- Rationale: Clean, readable typewriter font with excellent web rendering
- Fallback chain: "Courier Prime", "Courier New", "Courier", monospace
- Loading: Use Next.js font optimization with Google Fonts

### Color Palette

```css
--bg-paper: #F5F1E8        /* Warm off-white paper */
--text-primary: #2D2D2D    /* Soft dark gray */
--text-secondary: #5A5A5A  /* Medium gray for labels */
--button-bg: #E8E4D9       /* Slightly darker than paper */
--button-hover: #DDD9CC    /* Darker on hover */
--button-border: #C4BFB0   /* Subtle border */
--accent: #8B7355          /* Warm brown for highlights */
--shadow: rgba(0,0,0,0.1)  /* Subtle shadows */
```

### Layout Specifications

- **Container**: Max width 800px, centered, padding 2rem
- **TextArea**: Min height 200px, padding 1rem, border-radius 8px
- **Buttons**: Height 44px (touch-friendly), padding 0.75rem 1.5rem, border-radius 6px
- **Stats Panel**: Grid layout, 4 columns on desktop, 2 on mobile
- **Spacing**: Consistent 1rem gaps between major sections

### Responsive Behavior

- **Desktop (>768px)**: Full layout with stats panel beside buttons
- **Tablet (768px-1024px)**: Stacked layout with comfortable spacing
- **Mobile (<768px)**: Single column, larger touch targets, stats in 2x2 grid

## Sound Design Implementation

### Audio Assets

Two sound files required in `public/sounds/`:
- `typewriter-key.mp3`: Short (50-100ms), soft key press sound
- `typewriter-click.mp3`: Slightly longer (100-150ms), more pronounced click

### Sound Manager

```typescript
class SoundManager {
  private audioContext: AudioContext;
  private buffers: Map<string, AudioBuffer>;
  private enabled: boolean;
  private lastPlayTime: number;
  private throttleMs: number = 50;
  
  // Load audio files
  async loadSounds(): Promise<void>
  
  // Play sound with throttling
  playSound(soundName: string): void
  
  // Enable/disable sounds
  setEnabled(enabled: boolean): void
}
```

### Throttling Strategy

- Minimum 50ms between typing sounds to prevent overlap
- No throttling on button clicks (less frequent)
- Use timestamp comparison rather than setTimeout for accuracy

### LocalStorage Persistence

- Key: `tinyTextTools_soundEnabled`
- Value: `"true"` or `"false"`
- Load on mount, save on toggle

## Deployment Configuration

### Next.js Configuration

```javascript
// next.config.js
module.exports = {
  output: 'export', // Static export for Vercel
  images: {
    unoptimized: true // Required for static export
  }
}
```

### Vercel Deployment

- Build command: `npm run build`
- Output directory: `out`
- No environment variables required
- No serverless functions needed

### Performance Optimizations

- Font preloading via Next.js font optimization
- Audio files preloaded on first interaction
- Memoized transformation functions with useCallback
- Debounced stats calculation (if performance issues arise)

## Future Enhancements (Out of Scope for MVP)

- Dark mode toggle
- Keyboard shortcuts (Ctrl+Shift+T for Title Case, etc.)
- Undo/redo functionality
- Additional transformations (camelCase, UPPERCASE, etc.)
- Export text to file
- Text history/saved snippets
- Custom sound selection
