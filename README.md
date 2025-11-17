# Hangman (React + Vite)

Modern, responsive Hangman game built with React, Vite, and modular components. Guess words from a curated tech-themed list, track remaining lives, and enjoy animated SVG gallows plus both physical keyboard support and an on-screen keyboard.

## Features

- 🎯 Randomized secret words with win/loss detection and automatic reset
- 🧠 Custom `useHangman` hook encapsulates game logic and exposes helper actions/state
- ⌨️ Dual input: type letters or tap the virtual keyboard (with visual feedback)
- ❤️ Lives counter, status banner, and letter-by-letter word reveal
- 🧵 SVG gallows drawing that animates as wrong guesses pile up
- 📱 Responsive layout with semantic HTML, accessible labels, and polished styling

## Tech Stack

- React 18 + Vite 7
- Hooks + functional components
- CSS modules scoped to `src/App.css`, `src/index.css`, `src/styles/theme.css`, and component-level styles (e.g., `components/hangman.css`)
- PropTypes for runtime prop validation

## Getting Started

```bash
# install dependencies
npm install

# start dev server
npm run dev

# build for production
npm run build
```

The dev server outputs a local URL (usually `http://localhost:5173`). Press `Enter` in the game to restart a round after winning or losing.

## Project Structure

```
src/
├── App.jsx           # Shell layout + wiring of components
├── App.css           # Page-level layout + responsive presentation
├── index.css         # Global resets + theme import
├── styles/theme.css  # Theme tokens (colors, fonts, shadows)
├── components/
│   ├── GameBanner.jsx
│   ├── HangmanFigure.jsx
│   ├── Keyboard.jsx
│   ├── LetterInput.jsx
│   ├── LivesCounter.jsx
│   ├── WordDisplay.jsx
│   └── hangman.css   # SVG-specific styles
└── hooks/
    └── useHangman.js # Core game logic, word bank, input guards
```

## Customization Tips

- Add or replace words in `src/hooks/useHangman.js` (`WORD_BANK` array).
- Tweak `MAX_ATTEMPTS` to adjust difficulty.
- Fonts/colors live in `src/styles/theme.css`; update tokens to rebrand quickly.
- Keyboard layout is defined inside `Keyboard.jsx`; alter `KEY_LAYOUT` for alternative alphabets.

## License

This project is provided as-is for educational/demo purposes. Feel free to adapt it within your own projects. PRs and enhancements welcome!
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
