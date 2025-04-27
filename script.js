
const bubbleContainer = document.getElementById('bubble-container');
const targetNumberElement = document.getElementById('target-number');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let targetNumber = 0;
let score = 0;
let timeLeft = 15;
let timerInterval = null;
let gameStarted = false;
let rounds = 0;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createBubbles() {
  bubbleContainer.innerHTML = '';
  let numbers = [];

  for (let i = 0; i < 24; i++) {
    numbers.push(getRandomNumber(1, 99));
  }

  numbers.push(targetNumber);

  numbers = shuffleArray(numbers);

  numbers.forEach(num => {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const span = document.createElement('span');
    span.innerText = num;
    bubble.appendChild(span);
    bubble.addEventListener('click', handleBubbleClick);
    bubbleContainer.appendChild(bubble);
  });
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickTargetNumber() {
  const bubbles = document.querySelectorAll('.bubble span');
  const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
  targetNumber = randomBubble.innerText;
  targetNumberElement.innerText = `Target: ${targetNumber}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 15;
  timerElement.innerText = `Time: ${timeLeft}`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      rounds++;
      if (rounds >= 3) {
        setTimeout(() => {
          alert(`Game Over! Final Score: ${score}`);
          resetGame();
        }, 100);
      } else {
        startNewRound();
      }
    }
  }, 1000);
}

function handleBubbleClick(e) {
  const clickedNumber = e.target.innerText;

  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }

  createBubbles();

  const bubble = e.target.parentElement;

  if (bubble) {
    if (clickedNumber === targetNumber) {
      score += 10;
      bubble.classList.add('correct');
      setTimeout(() => {
        bubble.classList.remove('correct');
      }, 500); 
      e.target.removeEventListener('click', handleBubbleClick);
    } else {
      score -= 5;
      bubble.classList.add('wrong');
      setTimeout(() => {
        bubble.classList.remove('wrong');
      }, 500); 
    }
  }

  scoreElement.innerText = `Score: ${score}`;
}

function startNewRound() {
  gameStarted = false;
  createBubbles(); 
  pickTargetNumber(); 
}

function resetGame() {
  score = 0;
  rounds = 0;
  scoreElement.innerText = `Score: ${score}`;
  startNewRound();
  clearInterval(timerInterval);
  timerElement.innerText = `Time: 10`;
}

restartButton.addEventListener('click', resetGame);

document.addEventListener('DOMContentLoaded', function() {
  startNewRound();
});
