let min = 0;
let max = 7;
let answer = '';
let word = null;
let text = [];
let guessed = false;
let wordEl = document.getElementById('word');

const words = {
    // Colors category
    colors: [
        "red",
        "green",
        "blue",
        "yellow",
        "orange",
        "purple"
    ],

    // Cars category
    cars: [
        "mustang",
        "corvette",
        "camaro",
        "challenger",
        "charger",
        "ferrari"
    ],

    // Fruits category
    fruits: [
        "apple",
        "blueberry",
        "mandarin",
        "pineapple",
        "pomegranate",
        "watermelon"
    ],

    // Animals category
    animals: [
        'Cat',
        'Dog',
        'Penguin',
        'Lion',
        'Horse',
        'Elephant',
        'Rabbit',
        'Snake',
        'Leopard',
    ],

    // Home category
    home: [
        'Fork',
        'Knife',
        'Spoon',
        'Chopsticks',
        'Napkin',
        'Glass',
        'Plate',
        'Bowl',
        'Teaspoon',
        'Mug'
    ],

    // Food category
    food: [
        'Pizza',
        'Burger',
        'Pasta',
        'Salad',
        'Stew'
    ]
};

function selectCategory(category) {
    let categoryWords;
    switch (category) {
        case "colors":
            categoryWords = words.colors;
            break;
        case "cars":
            categoryWords = words.cars;
            break;
        case "fruits":
            categoryWords = words.fruits;
            break;
        case "animals":
            categoryWords = words.animals;
            break;
        case "home":
            categoryWords = words.home;
            break;
        case "food":
            categoryWords = words.food;
            break;
        default:
            const categoryKeys = Object.keys(words);
            const randomCategoryKey = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
            categoryWords = words[randomCategoryKey];
            break;
    }

    word = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    answer = word.toLowerCase();
    // resetGame();
    // initGame(); 
}


// Render the word with hidden letters
function renderWord() {
    let displayedWord = '';
    for (let i = 0; i < answer.length; i++) {
        if (text.includes(answer[i].toLowerCase())) {
            displayedWord += answer[i];
        } else {
            displayedWord += '_';
        }
        displayedWord += ' ';
    }
    
    if (wordEl) {
        wordEl.textContent = displayedWord.trim();
    } else {
        console.error("Element with ID 'word' not found.");
    }
}

// Generate the keyboard buttons
function generateKeyboardButtons() {
    let keyboardBtns = '';
    for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i);
        keyboardBtns += `<button class="btnEl border m-1 h-8 w-8 rounded-lg" onclick="guessLetter('${letter}', this)">${letter}</button>`;
    }
    
    const keyboardElement = document.getElementById('keyboard');
    if (keyboardElement) {
        keyboardElement.innerHTML = keyboardBtns;
    } else {
        console.error("Element with ID 'keyboard' not found.");
    }
}

// Guess a letter
function guessLetter(letter,buttonElement) {
    if (buttonElement) {
        buttonElement.style.backgroundColor = "grey";
    }
    letter = letter.toLowerCase();
    if (!guessed && !text.includes(letter)) {
        text.push(letter);
        if (!answer.toLowerCase().includes(letter)) {
            min++;
            picture();
        }
        renderWord();
        checkGameStatus();
    }
    
    // Check if the letter is the same as the category name
    const category = letter.toLowerCase();
    if (Object.keys(words).includes(category)) {
        selectCategory(category);
    }
}



function picture() {
      document.querySelector(".img").src = "./assets/image/" + min + ".png";
  }
  
  // Check the game status (win/lose)
  function checkGameStatus() {
    if (min >= max) { 
      alert('You lose!');
      resetGame();
    } else if (answer.toLowerCase().split('').every(letter => text.includes(letter))) {
      alert('Congratulations! You win!');
      resetGame();
    }
  }
  
// Reset the game
function resetGame() {
    answer = '';
    word = null;
    text = [];
    guessed = false;
    wordEl.textContent = '';
    selectCategory('colors')
    generateKeyboardButtons();
    renderWord();
    min = 0;
    picture()
}

// Initialize the game
function initGame() {
    selectCategory('colors')
    generateKeyboardButtons();
    renderWord();
}

// Start the game
initGame();
picture()