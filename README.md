# 📝 Tiny Text Tools

A cozy, retro-inspired web application featuring 4 simple text transformation utilities. Built with Next.js, TypeScript, and TailwindCSS, with a delightful typewriter aesthetic and sound effects.

![Tiny Text Tools](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tests](https://img.shields.io/badge/tests-30%20passing-green?style=flat-square)

## ✨ Features

### Text Transformations
- **Remove Extra Spaces** - Clean up text by removing leading/trailing whitespace and collapsing multiple spaces
- **Title Case** - Capitalize the first letter of each word
- **snake_case** - Convert text to lowercase with underscores
- **Reverse** - Reverse text character-by-character

### Additional Features
- 📊 **Real-time Statistics** - Character count (with/without spaces), word count, and line count
- 📋 **Copy to Clipboard** - One-click copying with visual feedback
- 🔊 **Typewriter Sounds** - Immersive audio feedback with toggle control
- ⌨️ **Keyboard Accessible** - Full keyboard navigation support
- 📱 **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- 🎨 **Retro Aesthetic** - Warm, paper-like design with Courier Prime font

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mihikajadhav02/tiny-text-tools.git

# Navigate to the project directory
cd tiny-text-tools

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧪 Testing

The project includes comprehensive test coverage with both unit tests and property-based tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

**Test Coverage:**
- ✅ 30 passing tests
- ✅ Property-based tests using fast-check (100 iterations each)
- ✅ Edge case handling
- ✅ Performance tests

## 📦 Building for Production

```bash
# Build static export
npm run build

# Preview the build
npx serve out
```

The application is configured for static export and can be deployed to any static hosting service.

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mihikajadhav02/tiny-text-tools)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

The app is configured with `output: 'export'` for static deployment.

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Testing:** Vitest + fast-check (property-based testing)
- **Audio:** Web Audio API
- **Font:** Courier Prime (Google Fonts)

## 📁 Project Structure

```
tiny-text-tools/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── TextArea.tsx
│   ├── ToolButton.tsx
│   ├── ToolButtonGroup.tsx
│   ├── StatsPanel.tsx
│   ├── ActionButtons.tsx
│   ├── FeedbackToast.tsx
│   └── SoundToggle.tsx
├── lib/                   # Utility functions
│   ├── transformations.ts # Text transformation logic
│   ├── textStats.ts       # Statistics calculation
│   └── soundManager.ts    # Audio management
├── public/sounds/         # Audio assets
└── tests/                 # Test files (*.test.ts)
```

## 🎯 Design Philosophy

This project follows **spec-driven development** with formal correctness properties:

- Each feature has clear requirements and acceptance criteria
- Correctness properties are defined and validated through property-based testing
- Universal properties are tested across 100+ random inputs
- Edge cases are explicitly handled

See `.kiro/specs/tiny-text-tools/` for detailed requirements, design, and implementation plan.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👤 Author

**Mihika Jadhav**
- GitHub: [@mihikajadhav02](https://github.com/mihikajadhav02)

## 🙏 Acknowledgments

- Typewriter sounds for immersive experience
- Property-based testing methodology for robust validation
- Next.js team for the amazing framework

---

Made with ❤️ and a typewriter aesthetic
