let dino = {
    height: 160
};

let human = {
    height: 60
};

let dinoPic = document.querySelector('#child1');
let humanPic = document.querySelector('#child2');

let maxHeight = 100; 
let ratio = human.height / dino.height;
console.log(ratio);

dinoPic.style.height = `${maxHeight}%`;
humanPic.style.height = `${maxHeight * ratio}%`;