'use strict';
// generating random number
let randomNumber = Math.trunc(Math.random() * 20 + 1);
// chosing losing audio track
const loseAudio = new Audio('/mixkit-retro-arcade-game-over-470.mp3');
// chosing wining audio track
const winAudio = new Audio('/mixkit-wind-chimes-2014.mp3');
//selcting score element
let score = Number(document.querySelector('.score').textContent);
//selecting high score element
let highScore = document.querySelector('.highscore').textContent;

if (localStorage.getItem('highScore') != null) {
  highScore = localStorage.getItem('highScore');
  document.querySelector('.highscore').textContent = highScore;
}

const input = document.querySelector('.check');

const again = document.querySelector('.again');

// display message
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// toggle background color
const changeBackGroundColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

// display score
const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

// change width
const changeWidth = function (width) {
  document.querySelector('.number').style.width = width;
};

input.addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  // when there is empty input
  if (!guess) {
    displayMessage('No Number! ⛔');
  }
  // when guess is right
  else if (guess === randomNumber) {
    displayMessage('🎉 correct Number!');
    score += 1;
    displayScore(score);
    changeBackGroundColor('#60b347');
    changeWidth('30rem');
    document.querySelector('.check').disabled = true;
    document.querySelector('.number').textContent = randomNumber;
    winAudio.play();
    if (score > highScore) {
      document.querySelector('.highscore').textContent = score;
      highScore = score;
      localStorage.setItem('highScore', highScore);
    }
  }
  // when guess is wrong
  else if (guess !== randomNumber) {
    if (score > 0) {
      displayMessage(
        guess > randomNumber ? 'Number is too Hight 📈' : 'Number is too Low 📉'
      );
      score--;
      displayScore(score);
    } else {
      displayMessage('You Lost the Game 😭');
      loseAudio.play();
    }
  }
});

// when click again buton game gets reset
again.addEventListener('click', () => {
  randomNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.number').textContent = '?';
  displayMessage('start guessing...');
  score = 20;
  displayScore(score);
  changeBackGroundColor('#222');
  changeWidth('15rem');
  document.querySelector('.check').disabled = false;
});
