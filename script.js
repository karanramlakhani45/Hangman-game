const wordEl = document.getElementById("word");
const hintEl = document.getElementById("hint");
const messageEl = document.getElementById("message");
const wrongLettersEl = document.getElementById("wrong-letters");
const keyboardEl = document.getElementById("keyboard");
const resetBtn = document.getElementById("reset");
const figureParts = Array.from(document.querySelectorAll(".figure-part"));
const livesCountEl = document.getElementById("lives-count");
const livesLeftEl = document.getElementById("lives-left");
const lifeDotsEl = document.getElementById("life-dots");
const letterInput = document.getElementById("letter-input");
const guessBtn = document.getElementById("guess-btn");

const WORDS = [
  { word: "JAVASCRIPT", hint: "Language that powers the web." },
  { word: "HYPERLINK", hint: "Allows you to click from page to page." },
  { word: "BROWSER", hint: "Software you are using right now." },
  { word: "ALGORITHM", hint: "A step-by-step recipe for solving a problem." },
  { word: "COMPILER", hint: "Turns high-level code into machine instructions." },
  { word: "FUNCTION", hint: "Reusable block of code with a name." },
  { word: "VARIABLE", hint: "Symbolic name for storing a value." },
  { word: "DATABASE", hint: "Stores structured information for apps." },
  { word: "INTERFACE", hint: "Boundary for interacting with software." },
  { word: "DEBUGGER", hint: "Tool used to inspect running code." }
];

let selectedWord = "";
let selectedHint = "";
let correctLetters = new Set();
let wrongLetters = new Set();
let gameOver = false;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const maxLives = figureParts.length;

function setupKeyboard() {
  keyboardEl.innerHTML = "";

  alphabet.forEach((letter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "key";
    button.textContent = letter;
    button.dataset.letter = letter;
    button.addEventListener("click", () => handleGuess(letter));
    keyboardEl.appendChild(button);
  });
}

function pickWord() {
  const choice = WORDS[Math.floor(Math.random() * WORDS.length)];
  selectedWord = choice.word;
  selectedHint = choice.hint;
}

function resetBoard() {
  correctLetters = new Set();
  wrongLetters = new Set();
  gameOver = false;
  messageEl.textContent = "";
  figureParts.forEach((part) => (part.style.display = "none"));
  Array.from(keyboardEl.children).forEach((button) => {
    button.disabled = false;
    button.classList.remove("used");
  });
  letterInput.value = "";
  letterInput.disabled = false;
  guessBtn.disabled = false;
  hintEl.textContent = selectedHint;
  updateWrongLetters();
  updateWord();
  renderLives();
}

function updateWord() {
  wordEl.innerHTML = "";

  selectedWord.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.className = "letter-slot";
    span.textContent = correctLetters.has(letter) ? letter : "";
    wordEl.appendChild(span);
  });

  checkWin();
}

function updateWrongLetters() {
  if (wrongLetters.size) {
    wrongLettersEl.textContent = `${wrongLetters.size} incorrect guesses: ${Array.from(
      wrongLetters
    ).join(", ")}`;
  } else {
    wrongLettersEl.textContent = "0 incorrect guesses";
  }

  figureParts.forEach((part, idx) => {
    part.style.display = idx < wrongLetters.size ? "block" : "none";
  });

  checkLoss();
  renderLives();
}

function setMessage(text, tone = "") {
  messageEl.textContent = text;
  messageEl.dataset.tone = tone;
}

function disableKeyboard() {
  Array.from(keyboardEl.children).forEach((button) => {
    button.disabled = true;
  });
  letterInput.disabled = true;
  guessBtn.disabled = true;
}

function handleGuess(letter) {
  if (gameOver) return;
  if (correctLetters.has(letter) || wrongLetters.has(letter)) return;

  const button = keyboardEl.querySelector(`[data-letter="${letter}"]`);
  if (button) {
    button.classList.add("used");
    button.disabled = true;
  }

  if (selectedWord.includes(letter)) {
    correctLetters.add(letter);
    setMessage(`Nice! "${letter}" is in the word.`, "positive");
    updateWord();
  } else {
    wrongLetters.add(letter);
    setMessage(`Nope, "${letter}" is not there.`, "negative");
    updateWrongLetters();
  }
}

function checkWin() {
  const uniqueLetters = new Set(selectedWord.split(""));
  if (uniqueLetters.size > 0 && uniqueLetters.size === correctLetters.size) {
    gameOver = true;
    setMessage("You solved it! 🎉", "positive");
    disableKeyboard();
  }
}

function checkLoss() {
  if (wrongLetters.size === figureParts.length) {
    gameOver = true;
    setMessage(`You lost! The word was ${selectedWord}.`, "negative");
    disableKeyboard();
    revealWord();
  }
}

function revealWord() {
  wordEl.innerHTML = "";

  selectedWord.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.className = "letter-slot";
    span.textContent = letter;
    wordEl.appendChild(span);
  });
}

function resetGame() {
  pickWord();
  resetBoard();
}

function handleKeydown(event) {
  if (event.target === letterInput) {
    if (event.key === "Enter") {
      submitTypedLetter();
    }
    return;
  }

  const letter = event.key?.toUpperCase();
  if (alphabet.includes(letter)) {
    handleGuess(letter);
  } else if (event.key === "Enter" && gameOver) {
    resetGame();
  }
}

function submitTypedLetter() {
  const value = letterInput.value.trim().toUpperCase();
  if (!value) return;
  const letter = value[0];
  if (!alphabet.includes(letter)) {
    setMessage("Please enter a letter A-Z.", "negative");
    return;
  }
  letterInput.value = "";
  handleGuess(letter);
}

function renderLives() {
  const livesLeft = Math.max(0, maxLives - wrongLetters.size);
  livesCountEl.textContent = `${livesLeft}/${maxLives} lives`;
  livesLeftEl.textContent = livesLeft;

  lifeDotsEl.innerHTML = "";
  for (let i = 0; i < maxLives; i += 1) {
    const dot = document.createElement("span");
    if (i >= livesLeft) {
      dot.classList.add("off");
    }
    lifeDotsEl.appendChild(dot);
  }
}

function init() {
  setupKeyboard();
  pickWord();
  resetBoard();
}

guessBtn.addEventListener("click", submitTypedLetter);
resetBtn.addEventListener("click", resetGame);
document.addEventListener("keydown", handleKeydown);

init();

