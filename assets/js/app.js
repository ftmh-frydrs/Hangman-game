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
    switch(category) {
      case 'colors':
        words = words.colors;
        break;
      case 'cars':
        words = words.cars;
        break;
      case 'fruits':
        words = words.fruits;
        break;
      case 'animals':
        words = words.animals;
        break;
      case 'home':
        words = words.home;
        break;
      case 'food':
        words = words.food;
        break;
      default:
        words = ['hangman', 'game', 'javascript', 'programming', 'computer', 'web'];
    }
  }
  