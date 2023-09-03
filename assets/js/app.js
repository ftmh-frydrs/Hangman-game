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



// Render the word with hidden letters
const renderWord = () => {
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
const generateKeyboardButtons = () => {
    const keyboardBtns = 'qwertyuiopasdfghjklzxcvbnm'.split('').map(event => `
             <button class="btnEl border m-1 h-8 w-8 rounded-lg"
              id="${event}"
              onClick="guessLetter('${event}')">
              ${event}
             </button>
`         
  ).join('');

             document.querySelector('#keyboard').innerHTML=keyboardBtns;
    };

// Guess a letter
const guessLetter = letter => {
    letter = letter.toLowerCase();
    if (!guessed && !text.includes(letter)) {
        text.push(letter);
        document.getElementById(letter).classList.add('bg-gray-400');
        if (!answer.toLowerCase().includes(letter)) {
            min++;
            picture();
        }
        renderWord();
    }
}


const picture = () => {
  document.querySelector(".img").src = "./assets/image/" + min + ".png";
}


// Initialize the game
const initGame = () => {
    generateKeyboardButtons();
    renderWord();
}

// Start the game
initGame();
