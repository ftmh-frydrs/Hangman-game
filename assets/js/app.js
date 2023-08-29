
let min = 0;
let max = 6;
let answer = '';
let word = null;
let text = [];
let guessed = false;
let wordEl = document.querySelector("#word");

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

    // Home items category
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

    // Food items category
    food: [
        'Pizza',
        'Burger',
        'Pasta',
        'Salad',
        'Stew',
        'Sushi',
        'Cake',
        'Kebab',
        'Rice',
        'Soup',
    ],
};


// Function to select a category and update the word list
function selectCategory(category) {
  let selectedWords = [];
  
  switch(category) {
    case 'colors':
      selectedWords = words.colors;
      break;
    case 'cars':
      selectedWords = words.cars;
      break;
    case 'fruits':
      selectedWords = words.fruits;
      break;
    case 'animals':
      selectedWords = words.animals;
      break;
    case 'home':
      selectedWords = words.home;
      break;
    case 'food':
      selectedWords = words.food;
      break;
    default:
      selectedWords = ['hangman', 'game', 'javascript', 'programming', 'computer', 'web'];
  }

  generateKeyboardButtons();
  rendoWords();

}

  // Function to randomly select a word from the categories
  const rendoWords = () => {
    answer= words[Math.floor(Math.random() * 6 )];
};

// Function to generate keyboard buttons
const generateKeyboardButtons = () => {
const keyboardBtns = 'qwertyuiopasdfghjklzxcvbnm'.split('').map(event => `
<button class="btnEl border m-1 h-8 w-8 rounded-lg"
    id="${event}"
    onClick="keyboardHandling('${event}')">
    ${event}
</button>
`         
  ).join('');

  document.querySelector('#keyboard').innerHTML=keyboardBtns;
};


const keyboardHandling = key => {

if(!text.includes(key)) {
  text.push(key);
  document.getElementById(key).classList.add('bg-gray-400');
}
}

