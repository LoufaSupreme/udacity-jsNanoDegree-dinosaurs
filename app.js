// create local array object of dinosaur data:
const dinoData = [
  {
    species: "Triceratops",
    weight: 13000,
    height: 114,
    diet: "Herbivore",
    where: "North America",
    when: "Late Cretaceous",
    fact: "First discovered in 1889 by Othniel Charles Marsh",
  },
  {
    species: "Tyrannosaurus Rex",
    weight: 11905,
    height: 144,
    diet: "Carnivore",
    where: "North America",
    when: "Late Cretaceous",
    fact: "The largest known skull measures in at 5 feet long.",
  },
  {
    species: "Anklyosaurus",
    weight: 10500,
    height: 55,
    diet: "Herbivore",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Anklyosaurus survived for approximately 135 million years.",
  },
  {
    species: "Brachiosaurus",
    weight: 70000,
    height: "372",
    diet: "Herbivore",
    where: "North America",
    when: "Late Jurasic",
    fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
  },
  {
    species: "Stegosaurus",
    weight: 11600,
    height: 79,
    diet: "Herbivore",
    where: "North America, Europe, Asia",
    when: "Late Jurasic to Early Cretaceous",
    fact: "The Stegosaurus had between 17 and 22 seperate plates and flat spines.",
  },
  {
    species: "Elasmosaurus",
    weight: 16000,
    height: 59,
    diet: "Carnivore",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
  },
  {
    species: "Pteranodon",
    weight: 44,
    height: 20,
    diet: "Carnivore",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
  },
  {
    species: "Pigeon",
    weight: 0.5,
    height: 9,
    diet: "Herbivore",
    where: "World Wide",
    when: "Holocene",
    fact: "All birds are living dinosaurs.",
  },
];

// define relevant classes:
class Dino {
  constructor(species, weight, height, diet, where, when, fact, index) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.facts = [fact];
    this.img = `./images/${this.species}.png`;
    this.index = index;
  }

  addFacts() {
    this.facts.push(`This type of dinosaur was chilling in ${this.where}.`);
    this.facts.push(`This type of dinosaur roamed the earth in the ${this.when} period.`);
  }

  compareWeight(human) {
    const ratio = Math.round(this.weight / human.weight);
    const fact = `This dinosaur weighed ${ratio}x more than your fatass`;
    this.facts.push(fact);
  }

  compareHeight(human) {
    const ratio = Math.round(this.height / human.height);
    const fact = `This dinosaur was ${ratio}x taller than you, shorty.`;
    this.facts.push(fact);
  }

  compareDiet(human) {
    let fact = "";
    if (this.diet === human.diet) {
      fact = "This MF ate the same shit as you do (and went extinct).";
    } else if (this.diet === "Herbivore" && human.diet === "Carnivore") {
      fact =
        "This guy showed respect for animals and just ate plants...unlike your selfish ass.";
    } else if (this.diet === "Carnivore" && human.diet === "Herbivore") {
      fact = "This MF ate meat like a man, unlike your bitch-ass.";
    } else if (human.diet == "Omnivore"){
        if (this.diet === 'Carnivore') {
            fact =
            "This guy just ate meat and didn't fuck with plants like you do sometimes.";
        }
        else {
            fact = "This guy just ate plants and didn't fuck with meat like you do sometimes.";
        }

    }
    this.facts.push(fact);
  }
}

class Human {
  constructor(name, weight, height, diet) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.index = 4;
  }
}

// Create Dino Objects
let dinos = [];

function makeDinos() {
  // create an array of random numbers, from 0 to 8, excluding 4
  // index 4 is the center tile in a grid of 3x3 and is reserved for the human tile
  let indices = [];
  while (indices.length < dinoData.length) {
      let index = Math.floor(Math.random() * dinoData.length);
      // if the random num is 4, replace it with 8 instead:
      if (index === 4) index = dinoData.length;
      // if the index returned from indexOf is -1, that means the number (index) wasn't found and thus can be added to the array:
      if (indices.indexOf(index) === -1) indices.push(index);
  }

  for (let i = 0; i < dinoData.length; i++) {
    const d = dinoData[i];
    const dino = new Dino(
      d.species,
      d.weight,
      d.height,
      d.diet,
      d.where,
      d.when,
      d.fact,
      indices[i]
    );
    if (dino.species !== 'Pigeon') {
        dino.compareDiet(human);
        dino.compareHeight(human);
        dino.compareWeight(human);
        dino.addFacts();
    }
    dinos.push(dino);
  }
}

// Create Human object:
let human = new Human("blank", 0, 0, "blank");

function buttonClick(e) {
    e.preventDefault();

    let name = document.querySelector("#name").value;
    let height1 = parseInt(document.querySelector("#height1").value); // feet
    let height2 = parseInt(document.querySelector("#height2").value); // inches
    let weight = parseInt(document.querySelector("#weight").value); // lbs
    let diet = document.querySelector("#diet").value;
  
    let height = height1 * 12 + height2;
  
    if (name === '' || isNaN(height) || isNaN(weight) || diet === '') {
        alert('Fill out all the inputs you filthy animal...');
    } 
    else {
        updateHuman(name, height, weight, diet);
        hideForm();
        makeDinos();
        displayGrid();  
    }
}

function updateHuman(name, height, weight, diet) {
  human.name = name;
  human.height = height;
  human.weight = weight;
  human.diet = diet;
}

function hideForm() {
  let formContainer = document.querySelector(".form-container");
  formContainer.style.display = "none";
}

function displayGrid() {
  let grid = document.querySelector("#grid");
  grid.innerHTML = '';

  let randBtnForm = document.querySelector('#randomize-form');
  randBtnForm.style.display = 'block';
  for (let i = 0; i < 9; i++) {
    if (i === 4) {
      grid.innerHTML += `
        <div class='grid-item'>
            <h3>${human.name}</h3>
            <img src="./images/human.png" alt="human">
            <p>
              Height: ${human.height}in <br>
              Weight: ${human.weight}lbs
            </p>
        </div>
      `;
    } 
    else if (
      dinos.findIndex(dino => {
        dino.index === i;
      })
    ) {
      let index = dinos.findIndex((dino) => dino.index === i);
      let dino = dinos[index];
      let randNum = Math.floor(Math.random() * dino.facts.length);
      grid.innerHTML += `
            <div class='grid-item'>
                <h3>${dino.species}</h3>
                <img src="${dino.img}" alt="${dino.species}">
                <p>${dino.facts[randNum]}</p>
            </div>
        `;
    }
  }
}

function randomizeFacts(e) {
    dinos = [];
    buttonClick(e);
}

const btn = document.querySelector("#btn");
btn.addEventListener("click", buttonClick);

const randBtn = document.querySelector('#randBtn');
randBtn.addEventListener("click", randomizeFacts)

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
