# Implementation Plan

- [ ] 1. Set up Next.js project with TypeScript and TailwindCSS
  - Initialize Next.js 14+ project with App Router and TypeScript
  - Configure TailwindCSS with custom color palette for typewriter aesthetic
  - Set up Courier Prime font using Next.js font optimization
  - Create global styles with typewriter theme
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 2. Implement core transformation functions
  - [x] 2.1 Create transformation utility functions
    - Write removeExtraSpaces function with whitespace normalization
    - Write toTitleCase function with word capitalization logic
    - Write toSnakeCase function with character filtering and underscore replacement
    - Write reverseText function using Unicode-aware reversal
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 6.2_
  
  - [x] 2.2 Write property test for removeExtraSpaces
    - **Property 1: Remove extra spaces normalization**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
  
  - [x] 2.3 Write property test for toTitleCase
    - **Property 2: Title case format**
    - **Validates: Requirements 3.1, 3.2, 3.3**
  
  - [x] 2.4 Write property test for toSnakeCase lowercase
    - **Property 3: Snake case lowercase conversion**
    - **Validates: Requirements 4.1**
  
  - [x] 2.5 Write property test for toSnakeCase whitespace
    - **Property 4: Snake case whitespace replacement**
    - **Validates: Requirements 4.2, 4.3**
  
  - [x] 2.6 Write property test for toSnakeCase character filtering
    - **Property 5: Snake case character filtering**
    - **Validates: Requirements 4.4, 4.5**
  
  - [x] 2.7 Write property test for reverseText round trip
    - **Property 6: Reverse text round trip**
    - **Validates: Requirements 6.1, 6.2**

- [x] 3. Implement statistics calculation
  - [x] 3.1 Create textStats utility functions
    - Write calculateStats function that computes totalChars, charsNoSpace, wordCount, and lineCount
    - Handle edge cases for empty strings and whitespace-only strings
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [x] 3.2 Write property test for character count accuracy
    - **Property 7: Character count accuracy**
    - **Validates: Requirements 5.1, 5.2**
  
  - [x] 3.3 Write property test for word count accuracy
    - **Property 8: Word count accuracy**
    - **Validates: Requirements 5.3**
  
  - [x] 3.4 Write property test for line count accuracy
    - **Property 9: Line count accuracy**
    - **Validates: Requirements 5.4**

- [x] 4. Create sound manager system
  - [x] 4.1 Implement SoundManager class
    - Create SoundManager with Web Audio API integration
    - Implement sound loading from public/sounds directory
    - Add throttling mechanism to prevent audio spam
    - Add enable/disable toggle functionality
    - Implement localStorage persistence for sound preference
    - _Requirements: 10.1, 10.2, 10.3, 10.4_
  
  - [x] 4.2 Write property test for sound throttling
    - **Property 12: Sound throttling prevents spam**
    - **Validates: Requirements 10.3**
  
  - [x] 4.3 Write property test for modifier key filtering
    - **Property 13: Modifier keys filtered**
    - **Validates: Requirements 10.5**
  
  - [ ] 4.4 Add typewriter sound assets
    - Add typewriter-key.mp3 to public/sounds directory
    - Add typewriter-click.mp3 to public/sounds directory
    - _Requirements: 10.1, 10.2_

- [x] 5. Build React components
  - [x] 5.1 Create TextArea component
    - Build controlled textarea component with typewriter styling
    - Add onChange handler for text updates
    - Add onKeyPress handler for typing sounds
    - Apply paper-like background and comfortable height
    - _Requirements: 1.3, 9.1, 9.2_
  
  - [x] 5.2 Create ToolButton component
    - Build reusable button component with typewriter aesthetic
    - Add rounded corners, subtle shadows, and hover effects
    - Implement keyboard accessibility (Enter/Space activation)
    - Add click sound integration
    - _Requirements: 9.4, 9.5, 11.2_
  
  - [x] 5.3 Create ToolButtonGroup component
    - Build container for five transformation buttons
    - Arrange buttons in responsive grid layout
    - Label buttons: "Remove extra spaces", "Title Case", "snake_case", "Count", "Reverse"
    - _Requirements: 1.4_
  
  - [x] 5.4 Create StatsPanel component
    - Build statistics display with four metrics
    - Show totalChars, charsNoSpace, wordCount, lineCount
    - Apply typewriter font and consistent styling
    - Make responsive (4 columns desktop, 2 columns mobile)
    - _Requirements: 12.1, 12.2_
  
  - [x] 5.5 Create ActionButtons component
    - Build Copy and Clear buttons with distinct styling
    - Integrate click sounds
    - Implement keyboard accessibility
    - _Requirements: 1.5, 11.3, 11.4_
  
  - [x] 5.6 Create FeedbackToast component
    - Build "Copied!" notification component
    - Implement auto-hide after 1.5-2 seconds
    - Position near copy button or bottom of interface
    - _Requirements: 7.2, 7.3_
  
  - [x] 5.7 Create SoundToggle component
    - Build mute/unmute toggle button
    - Display current sound state (icon or text)
    - Integrate with SoundManager
    - _Requirements: 10.1, 10.2_

- [x] 6. Implement main application page
  - [ ] 6.1 Build main page component with state management
    - Set up React state for text, stats, copied, and soundEnabled
    - Implement transformation button handlers that update text state
    - Implement count button handler that preserves text
    - Implement copy button handler with clipboard API
    - Implement clear button handler that resets state
    - Wire up all components with proper props
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1-2.5, 3.1-3.4, 4.1-4.6, 5.5, 6.1-6.3, 7.1, 8.1, 8.2_
  
  - [ ] 6.2 Write property test for count operation preserves text
    - **Property 10: Count operation preserves text**
    - **Validates: Requirements 5.5**
  
  - [ ] 6.3 Write property test for stats update on text change
    - **Property 11: Stats update on text change**
    - **Validates: Requirements 12.2**
  
  - [ ] 6.4 Add automatic stats calculation on text change
    - Use useEffect or derived state to recalculate stats when text changes
    - Ensure stats update in real-time as user types
    - _Requirements: 12.2, 12.3_

- [x] 7. Implement keyboard accessibility
  - [ ] 7.1 Add keyboard navigation support
    - Ensure all interactive elements are focusable with Tab key
    - Add visible focus indicators to all buttons
    - Implement Enter/Space key handlers for all buttons
    - Test tab order is logical (textarea → tools → actions → sound toggle)
    - _Requirements: 11.1, 11.2, 11.3, 11.4_
  
  - [ ] 7.2 Add focus management for clear operation
    - After clear button is clicked, return focus to textarea
    - _Requirements: 8.3_

- [x] 8. Add error handling and edge cases
  - [ ] 8.1 Implement clipboard error handling
    - Check for navigator.clipboard availability
    - Show error message if clipboard access denied
    - Provide fallback message for unsupported browsers
    - _Requirements: 7.1_
  
  - [ ] 8.2 Implement audio error handling
    - Handle audio file load failures gracefully
    - Resume AudioContext on first user interaction
    - Continue app functionality if audio unavailable
    - _Requirements: 10.1, 10.2, 10.4_
  
  - [ ] 8.3 Handle empty textarea interactions
    - Ensure all transformations handle empty strings correctly
    - Display zero stats for empty textarea
    - Allow copy of empty string
    - _Requirements: 2.5, 3.4, 4.6, 6.3, 7.4, 12.3_

- [x] 9. Style and polish UI
  - [ ] 9.1 Apply typewriter aesthetic throughout
    - Verify Courier Prime font is applied to all elements
    - Apply warm paper-like background color (#F5F1E8)
    - Use soft dark gray text color (#2D2D2D)
    - Add subtle shadows to buttons and textarea
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  
  - [ ] 9.2 Implement responsive layout
    - Test layout on desktop (>768px)
    - Test layout on tablet (768px-1024px)
    - Test layout on mobile (<768px)
    - Ensure touch-friendly button sizes (44px height minimum)
    - Adjust stats panel to 2x2 grid on mobile
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [ ] 9.3 Add hover and focus states
    - Implement button hover effects (darker border/background)
    - Add visible focus indicators for keyboard navigation
    - Ensure all interactive states are visually clear
    - _Requirements: 9.5, 11.1_

- [x] 10. Configure for static deployment
  - [ ] 10.1 Set up Next.js static export
    - Configure next.config.js with output: 'export'
    - Disable image optimization for static export
    - Test build process generates static files
    - _Requirements: All (deployment requirement)_
  
  - [ ] 10.2 Optimize performance
    - Preload font files
    - Memoize transformation functions with useCallback
    - Ensure audio files are preloaded on first interaction
    - Test with large text inputs (10,000+ characters)
    - _Requirements: All (performance requirement)_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
