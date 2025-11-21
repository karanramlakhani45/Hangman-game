const wordHints = {
  // Easy words
  'code': 'Instructions written for a computer',
  'bug': 'An error in a program',
  'loop': 'Repeating a set of instructions',
  'array': 'A collection of items stored in order',
  'linux': 'An open-source operating system',
  'cloud': 'Remote servers accessed over the internet',
  'stack': 'A data structure that follows LIFO principle',
  'debug': 'Finding and fixing errors in code',
  'query': 'A request for data from a database',
  'pixel': 'The smallest unit of a digital image',
  // Medium words
  'javascript': 'A popular programming language for web development',
  'react': 'A JavaScript library for building user interfaces',
  'nodejs': 'JavaScript runtime built on Chrome\'s V8 engine',
  'python': 'A high-level programming language known for simplicity',
  'algorithm': 'A step-by-step procedure for solving a problem',
  'function': 'A reusable block of code that performs a task',
  'variable': 'A container that stores a value',
  'object': 'A collection of properties and methods',
  'boolean': 'A data type with only two values: true or false',
  'compiler': 'A program that translates code into machine language',
  // Hard words
  'asynchronous': 'Operations that don\'t block the execution thread',
  'virtualization': 'Creating virtual versions of hardware or software',
  'polymorphism': 'The ability to process objects differently based on their type',
  'microservice': 'A small, independent service in a larger application',
  'refactorings': 'Restructuring code without changing its functionality',
  'cryptography': 'The practice of secure communication techniques',
  'serialization': 'Converting data structures into a storable format',
  'optimization': 'Improving code performance and efficiency',
  'encapsulation': 'Bundling data and methods that operate on that data',
  'dependencies': 'External packages or modules required by a project',
};

const difficultySettings = {
  easy: {
    lives: 8,
    words: [
      'code',
      'bug',
      'loop',
      'array',
      'linux',
      'cloud',
      'stack',
      'debug',
      'query',
      'pixel',
    ],
  },
  medium: {
    lives: 6,
    words: [
      'javascript',
      'react',
      'nodejs',
      'python',
      'algorithm',
      'function',
      'variable',
      'object',
      'boolean',
      'compiler',
    ],
  },
  hard: {
    lives: 4,
    words: [
      'asynchronous',
      'virtualization',
      'polymorphism',
      'microservice',
      'refactorings',
      'cryptography',
      'serialization',
      'optimization',
      'encapsulation',
      'dependencies',
    ],
  },
};

const difficultySelect = document.getElementById('difficultySelect');
let currentDifficulty = difficultySelect?.value || 'medium';
if (!difficultySettings[currentDifficulty]) {
  currentDifficulty = 'medium';
}

let maxLives = difficultySettings[currentDifficulty].lives;
let lives = maxLives;
let chosenWord = '';
let guessedLetters = new Set();
let incorrectGuesses = 0;

const figureParts = Array.from(document.querySelectorAll('.figure-part'));
const incorrectText = document.getElementById('incorrectGuessCount');
const wordContainer = document.querySelector('.word-container');
const livesLeft = document.getElementById('livesLeft');
const livesDotsContainer = document.querySelector('.lives-dots');
let livesDots = [];
const resetBtn = document.getElementById('resetBtn');
const letterForm = document.getElementById('letterForm');
const letterInput = document.getElementById('letterInput');
const keyboard = document.querySelector('.keyboard');

const livesLeftDisplay = document.getElementById('livesLeftDisplay');

const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const gameContainer = document.getElementById('gameContainer');
const hintDisplay = document.getElementById('hintDisplay');

function getRandomWord() {
  const list = difficultySettings[currentDifficulty]?.words ?? [];
  if (!list.length) return 'code';
  return list[Math.floor(Math.random() * list.length)];
}

function renderLivesDots(total) {
  if (!livesDotsContainer) return;
  livesDotsContainer.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    livesDotsContainer.appendChild(dot);
  }
  livesDots = Array.from(livesDotsContainer.children);
}

// Initialize the letter buttons (keyboard)
function initializeKeyboard() {
  keyboard.innerHTML = '';
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement('button');
    button.textContent = letter;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', `Letter ${letter}`);
    button.addEventListener('click', () => handleLetter(letter.toLowerCase()));
    keyboard.appendChild(button);
  }
}

// Reset game state and UI
function resetGame() {
  maxLives = difficultySettings[currentDifficulty].lives;
  lives = maxLives;
  guessedLetters.clear();
  incorrectGuesses = 0;
  chosenWord = getRandomWord();
  renderLivesDots(maxLives);

  figureParts.forEach(part => part.classList.add('hidden'));
  updateIncorrectGuessText();
  livesLeft.textContent = lives;
  livesLeftDisplay.textContent = `${lives}/${maxLives} lives`;

  updateWordDisplay();
  resetKeyboard();
  updateHint();

  letterInput.disabled = false;
  letterInput.value = '';
  letterInput.focus();
}

function resetKeyboard() {
  Array.from(keyboard.children).forEach(button => {
    button.classList.remove('used');
    button.disabled = false;
  });
}

function updateWordDisplay() {
  const display = chosenWord
    .split('')
    .map(letter => (guessedLetters.has(letter) ? letter.toUpperCase() : '_'))
    .join(' ');
  wordContainer.textContent = display;
}

function updateIncorrectGuessText() {
  incorrectText.textContent = `${incorrectGuesses} incorrect guess${incorrectGuesses !== 1 ? 'es' : ''}`;
}

// Handle letter guessed either from keyboard or input form
function handleLetter(letter) {
  if (guessedLetters.has(letter) || lives <= 0) return;

  guessedLetters.add(letter);
  disableLetterButton(letter);

  if (chosenWord.includes(letter)) {
    updateWordDisplay();
    checkWin();
  } else {
    incorrectGuesses++;
    updateIncorrectGuessText();
    showNextFigurePart();
    decreaseLives();
    checkLose();
  }
}

function disableLetterButton(letter) {
  const button = Array.from(keyboard.children).find(
    btn => btn.textContent.toLowerCase() === letter
  );
  if (button) {
    button.classList.add('used');
    button.disabled = true;
  }
}

function showNextFigurePart() {
  if (incorrectGuesses <= figureParts.length) {
    figureParts[incorrectGuesses - 1].classList.remove('hidden');
  }
}

function decreaseLives() {
  lives--;
  livesLeft.textContent = lives;
  livesLeftDisplay.textContent = `${lives}/${maxLives} lives`;
  if (livesDots[lives]) {
    livesDots[lives].classList.add('inactive');
  }
}

function checkWin() {
  const won = chosenWord.split('').every(letter => guessedLetters.has(letter));
  if (won) {
    setTimeout(() => {
      alert(`🎉 Congrats! You guessed the word "${chosenWord.toUpperCase()}" correctly!`);
    }, 200);
    disableInput();
  }
}

function checkLose() {
  if (lives <= 0) {
    setTimeout(() => {
      alert(`😞 Game over! The word was "${chosenWord.toUpperCase()}".`);
    }, 200);
    revealWord();
    disableInput();
  }
}

function revealWord() {
  const display = chosenWord
    .split('')
    .map(letter => letter.toUpperCase())
    .join(' ');
  wordContainer.textContent = display;
}

function disableInput() {
  letterInput.disabled = true;
  Array.from(keyboard.children).forEach(button => button.disabled = true);
}

function updateHint() {
  if (!hintDisplay || !chosenWord) return;
  const hint = wordHints[chosenWord] || 'No hint available for this word.';
  hintDisplay.textContent = hint;
}

// Form submission
letterForm.addEventListener('submit', e => {
  e.preventDefault();
  const letter = letterInput.value.trim().toLowerCase();
  if (/^[a-z]$/.test(letter)) {
    handleLetter(letter);
  }
  letterInput.value = '';
  letterInput.focus();
});

// Reset button
resetBtn.addEventListener('click', resetGame);

// Start screen button click
startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  resetGame();
});

if (difficultySelect) {
  difficultySelect.addEventListener('change', e => {
    const selected = e.target.value;
    if (difficultySettings[selected]) {
      currentDifficulty = selected;
      resetGame();
    }
  });
}

// Initialize on load
initializeKeyboard();