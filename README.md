# Hangman Game

This project delivers a modern browser-based Hangman experience built with vanilla HTML, CSS, and JavaScript. It also ships with documentation assets often required for academic submissions (report, synopsis, PPT outline, etc.).

## Prerequisites

- Any modern desktop or mobile browser (Chrome, Edge, Firefox, Safari)
- Optional: A simple HTTP server (only needed if you plan to serve from `http://localhost`; double-clicking `index.html` works fine)

## Running the Demo

1. Download or clone the project folder.
2. Open `index.html` in your preferred browser.
3. Guess letters either by clicking the on-screen keyboard or typing on your hardware keyboard.

## Project Structure

- `index.html`, `style.css`, `script.js` – core web app
- `docs/` – project report, synopsis, user manual, and supporting info
- `assets/mockup.png` – reference screenshot used in the report
- `extras/` – optional presentation deck outline
- `hangman_words.sql` – sample database script that stores the playable words and hints

## Rebuilding / Customizing

- Update the `WORDS` array in `script.js` or seed additional words via the SQL script.
- Adjust styling tokens (colors, fonts, spacing) in `style.css`.
- The UI is responsive out-of-the-box; tweak grid breakpoints around the `.game` selector for layout changes.

## Testing

Manual smoke tests are described in `docs/ProjectReport.md`. Run them after any gameplay tweak to make sure win/loss detection, keyboard handling, and reset flows behave as expected.

## Packaging for Submission

1. Print/export `docs/ProjectReport.md` to PDF for the “printed copy”.
2. Bundle the full folder (or a zipped archive) as the “soft copy”.
3. Include `extras/Presentation.pptx` (generated from the outline) and `docs/UserManual.md` if your evaluator requests the optional assets.

## License

This project is provided for academic demonstration purposes. Adapt and extend as needed for your coursework.

