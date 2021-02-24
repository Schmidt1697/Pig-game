'use strict';
const p1Background = document.querySelector('.player--0');
const p2Background = document.querySelector('.player--1');
const p1TotalScore = document.getElementById('score--0');
const p2TotalScore = document.getElementById('score--1');
const diceImgClass = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const p1CurrentScore = document.getElementById('current--0');
const p2CurrentScore = document.getElementById('current--1');

//starting conditions and variables
let scores, currentScore, activePlayer, playing;

function startGame() {
  playing = true;
  p1TotalScore.innerText = 0;
  p2TotalScore.innerText = 0;
  p1CurrentScore.innerText = 0;
  p2CurrentScore.innerText = 0;
  diceImgClass.classList.add('hidden');
  p1Background.classList.remove('player--winner');
  p2Background.classList.remove('player--winner');
  p2Background.classList.remove('player--active');
  p1Background.classList.add('player--active');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
}
//start the game from load/refresh
startGame();

//create random number and display associated random dice pic
function rollDice() {
  if (playing) {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    diceImgClass.src = `dice-${diceRoll}.png`;
    diceImgClass.classList.remove('hidden');

    //switch to next player if dice is 1, else add total to current score
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).innerText = currentScore; //CHANGE LATER
    } else {
      switchPlayer();
    }
  }
}

//function checking if the active player is 0? - change it to 1, else change it to 0 to switch between player1 and player2
//change text content back to 0 and reset score.
//change background color by toggling player--active class between player 1 and 2
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).innerText = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  p1Background.classList.toggle('player--active');
  p2Background.classList.toggle('player--active');
}

holdBtn.addEventListener('click', function () {
  //add score of active player to total score (checking index of activePlayer)
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).innerText =
      scores[activePlayer];
    //check if player's score >100, if not, switch player
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceImgClass.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//click roll-dice button
rollBtn.addEventListener('click', rollDice);

//click new-game button, reset everything
newGameBtn.addEventListener('click', startGame);
