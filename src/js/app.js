let min = 0;
let max = 7;
let answer = '';
let word = null;
let text = [];
let guessed = false;
let wordEl = document.getElementById('text');
const continueBtn = document.querySelector('.continue');
const descriptionEl = document.getElementById('description');
const gameOverMusic = document.getElementById('gameover');
const music = document.getElementById('music');
const winMusic = document.getElementById('win');


const words = {
    // Colors category
    colors: [
        { word: "red", description: "A primary color often associated with love, passion, and intensity." },
        { word: "green", description: "A color commonly found in nature, symbolizing growth, health, and renewal." },
        { word: "blue", description: "A calming color often associated with the sky and the ocean." },
        { word: "yellow", description: "A bright and cheerful color representing happiness and energy." },
        { word: "orange", description: "A warm color that combines the energy of red and the happiness of yellow." },
        { word: "purple", description: "A color associated with royalty, luxury, and creativity." }
    ],

    // Cars category
    cars: [
        { word: "mustang", description: "A famous model of sports car manufactured by Ford." },
        { word: "corvette", description: "A high-performance sports car produced by Chevrolet." },
        { word: "camaro", description: "Another popular sports car model from Chevrolet." },
        { word: "challenger", description: "A powerful muscle car produced by Dodge." },
        { word: "charger", description: "A sedan and muscle car model from Dodge." },
        { word: "ferrari", description: "An Italian luxury sports car manufacturer known for its high-speed cars." }
    ],

    // Fruits category
    fruits: [
        { word: "apple", description: "A widely consumed fruit known for its crisp texture and sweet or tart taste." },
        { word: "blueberry", description: "A small, round fruit with a sweet and slightly tangy flavor." },
        { word: "mandarin", description: "A small citrus fruit with a sweet and easy-to-peel skin." },
        { word: "pineapple", description: "A tropical fruit known for its sweet and tangy taste." },
        { word: "pomegranate", description: "A fruit with juicy seeds, often associated with health benefits." },
        { word: "watermelon", description: "A refreshing and hydrating fruit, especially popular in hot weather." }
    ],

    // Animals category
    animals: [
        { word: "cat", description: "A domesticated feline known for its independent and playful nature." },
        { word: "dog", description: "A loyal and friendly domesticated animal often kept as a pet." },
        { word: "penguin", description: "A flightless bird known for its distinctive appearance and waddling walk." },
        { word: "lion", description: "A majestic big cat, often referred to as the 'king of the jungle.'" },
        { word: "horse", description: "A domesticated animal used for transportation, work, and recreation." },
        { word: "elephant", description: "A large, intelligent mammal known for its size and strength." },
        { word: "rabbit", description: "A small mammal with long ears and a fluffy tail." },
        { word: "snake", description: "A reptile known for its elongated body and lack of legs." },
        { word: "leopard", description: "A big cat known for its striking spots and powerful build." }
    ],

    // Home category
    home: [
        { word: "fork", description: "A utensil with prongs used for eating and serving food." },
        { word: "knife", description: "A sharp-edged tool used for cutting and slicing." },
        { word: "spoon", description: "A utensil with a shallow bowl-shaped end used for eating and stirring." },
        { word: "chopsticks", description: "Utensils traditionally used in East Asian cuisine for picking up food." },
        { word: "napkin", description: "A piece of fabric used for wiping the mouth and hands during meals." },
        { word: "glass", description: "A container for holding and drinking liquids." },
        { word: "plate", description: "A flat dish on which food is served." },
        { word: "bowl", description: "A deep, round dish used for serving and eating food." },
        { word: "teaspoon", description: "A small spoon used for stirring and measuring small quantities." },
        { word: "mug", description: "A cylindrical cup often used for hot beverages like coffee or tea." }
    ],

    // Food category
    food: [
        { word: "pizza", description: "A popular Italian dish consisting of a flatbread topped with various ingredients." },
        { word: "burger", description: "A sandwich made with a ground meat patty, typically beef." },
        { word: "pasta", description: "Italian noodles available in various shapes and served with various sauces." },
        { word: "salad", description: "A dish made of mixed greens, vegetables, and often dressings." },
        { word: "stew", description: "A hearty and slow-cooked dish containing meat, vegetables, and broth." }
    ]
};


async function selCategory(category){
    await localStorage.setItem('category',category);
    window.location.href = `index.html?category=${category}`;
}

async function time(t){
    await localStorage.setItem('t',t);
    window.location.href = `selection.html?t=${t}`;
}

const selectMode = (mode) => {
    if (mode === 'withTime') {
        startTimer();
    } else if (mode === "withoutTime") {
        guessed = false;
        text = [];
        answer = selectCategory();
        min = 0;
        picture();
        renderWord();
        generateKeyboardButtons();
        document.getElementById('timer-icon').style.display="none"
    }
}



const selectCategory = () => {
    let categoryWords;
    let category = localStorage.getItem('category');
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

    word = categoryWords[Math.floor(Math.random() * categoryWords.length)].word;
    return  word.toLowerCase();
}


// Render the word with hidden letters and description
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
    }    
    
    const categoryWords = words[localStorage.getItem('category')];
    const currentWord = categoryWords.find(wordObj => wordObj.word === answer);
    
    if (descriptionEl && currentWord) {
        descriptionEl.textContent = currentWord.description;
    }
}

// Check the game status (win/lose) and display description
const checkGameStatus = () => {
    if (min == max) {
        document.querySelector("#keyboard").innerHTML = `<img class="w-[200px] h-[130px] mx-auto" src="../../assets/image/sad.GIF">
        <p class="text-gray-900 text-2xl pt-2">Game Over</p>
        <p class="text-gray-900 text-2xl">answer : ${answer}</p>`;
        gameOverMusic.play();
        music.pause();
        const categoryWords = words[localStorage.getItem('category')];
        const currentWord = categoryWords.find(wordObj => wordObj.word === answer);
        
        if (descriptionEl && currentWord) {
            descriptionEl.textContent = currentWord.description;
            resetGame();
        }
    } else if (answer.toLowerCase().split('').every(letter => text.includes(letter))) {
        document.querySelector("#keyboard").innerHTML = `<img class="w-[200px] h-[130px] mx-auto" src="../../assets/image/happy.GIF">
        <p class="text-gray-900 text-2xl pt-2"> Congratulations </p>`;
        winMusic.play();
        music.pause();
        if (!guessed) {
            stopTimer(); 
            guessed = true;
        }
        resetGame();
    }
}


// Generate the keyboard buttons
const generateKeyboardButtons = () => {
    let keyboardBtns = '';
    for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i).toLowerCase();
        keyboardBtns += `<button class="btnEl border m-1 h-8 w-8 rounded-lg" data-letter="${letter}" onclick="guessLetter('${letter}', this)">${letter}</button>`;
    }
    
    const keyboardElement = document.getElementById('keyboard');
    if (keyboardElement) {
        keyboardElement.innerHTML = keyboardBtns;
    }
}


// Guess a letter
const guessLetter = (letter,buttonElement) => {
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

// Add this code inside your script after initializing the game
document.addEventListener('keydown', (event) => {
    const letter = event.key.toLowerCase(); 
    if (/^[a-z]$/.test(letter)) {
        const buttonElement = document.querySelector(`button[data-letter="${letter}"]`);
        if (buttonElement) {
            guessLetter(letter, buttonElement);
        }
    }
});

const picture = () => {
      document.querySelector(".img").src = "./assets/image/" + min + ".png";
  }


const muteButton = document.getElementById('muteButton');
function toggleMute() {
    if (music.muted) {
        music.muted = false;
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        music.muted = true;
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}
  
  continueBtn.addEventListener('click' , () => {
    continueBtn.style.display = 'none'; 
    descriptionEl.style.display = 'flex';
    gameOverMusic.pause();
    music.play()
    winMusic.pause()
    initGame();
  })


let timerInterval;
let remainingTime = 30; 

const startTimer = () => {
    const timer = document.getElementById('timer');
    const timerCountdown = document.getElementById('timer-countdown');

    let seconds = remainingTime;
    timer.style.display = 'block';

    const updateTimer = () => {
        timerCountdown.textContent = seconds;
        seconds--;

        if (seconds < 0) {
            clearInterval(timerInterval);
            timer.style.display = 'none';
            document.querySelector("#keyboard").innerHTML = `<img class="w-[200px] h-[130px] mx-auto" src="https://media.giphy.com/media/l2JdTxHEW3lVr4EtG/giphy.gif">
            <p class="text-gray-900 text-2xl pt-2">You Lose </p>
            <p class="text-gray-900 text-2xl">answer : ${answer}</p>`;
            gameOverMusic.play();
            music.pause();
            descriptionEl.style.display='none';
            resetGame();
        }
    }

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000); 
}

const stopTimer =() => {
    clearInterval(timerInterval);
}


// Reset the game
const resetGame = () => {
    remainingTime = 30;
    answer = '';
    word = null;
    text = [];
    guessed = false;
    wordEl.textContent = '';
    answer = selectCategory();
    min = 0;
    picture();
    continueBtn.style.display = 'flex';
    descriptionEl.style.display = 'none';
    stopTimer();
}

// Initialize the game
const initGame = () => {
    answer = selectCategory()
    generateKeyboardButtons();
    renderWord();
    selectMode(localStorage.getItem('t'));
}

// Start the game
initGame();
picture();
