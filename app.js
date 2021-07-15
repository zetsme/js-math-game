import { createSplashPage } from './splashPage.js';
import { createCountdownPage } from './countdownPage.js';
import { createGamePage } from './gamePage.js';
import { createResultPage } from './resultPage.js';
import { createArrayOfRandomEquations } from './randomEquations.js';
import { findCoincidencesinArrays } from './utils.js';
import { compareAndSaveToLocalStorage, getSavedBestScores } from './localStorage.js';
const valuesArr = [10, 20, 30];
const variantsArr = [3, 2, 1, 'GO'];
let questionAmount;
let arrayOfRandomEquations = [];
let playerGuessArr = [];

let bestScoresArr = getSavedBestScores(valuesArr);

createSplashPage(bestScoresArr);

const radioButtonsEventListener = () => {
  document.querySelector('.radioButtons-container').addEventListener('click', () => {
    document.querySelectorAll('.radio-container').forEach((el) => {
      el.classList.remove('selected-radio-container');
      if (el.children[1].checked) {
        el.classList.add('selected-radio-container');
      }
    });
  });
};

radioButtonsEventListener();

const getRadioValue = () => {
  document
    .querySelector('.radioButtons-container')
    .querySelectorAll('input')
    .forEach((input) => {
      if (input.checked) {
        questionAmount = input.value;
      }
    });
};

const startGame = (e) => {
  e.preventDefault();
  getRadioValue();
  createCountdownPage(variantsArr);
  setTimeout(() => {
    let equationsCount = 0;
    let gameTime = 0;
    arrayOfRandomEquations = createArrayOfRandomEquations(questionAmount);
    createGamePage();

    const item = document.querySelector('.item');
    const createNewItem = (count) => {
      item.textContent = arrayOfRandomEquations[count].equation;
      document.querySelector('.question-number').textContent = `${equationsCount + 1} / ${
        arrayOfRandomEquations.length
      }`;
    };
    createNewItem(equationsCount);

    const timer = setInterval(() => {
      gameTime += 0.1;
      document.querySelector('.equations-timer').textContent = `${gameTime.toFixed(1)}s`;
    }, 100);

    const select = (guess) => {
      playerGuessArr.push(guess);
      equationsCount++;
      if (equationsCount >= arrayOfRandomEquations.length) {
        clearInterval(timer);
        const rightWrongValues = findCoincidencesinArrays(
          playerGuessArr,
          arrayOfRandomEquations.map((i) => i.evaluated)
        );
        const timeTotal = createResultPage(rightWrongValues, gameTime);
        compareAndSaveToLocalStorage(questionAmount, timeTotal);
        const playAgainBtn = document.querySelector('.playAgainBtn');
        playAgainBtn.addEventListener('click', () => {
          bestScoresArr = getSavedBestScores(valuesArr);
          createSplashPage(bestScoresArr);
          radioButtonsEventListener();
          document.querySelector('form', addEventListener('submit', startGame));
          //
        });
      } else {
        createNewItem(equationsCount);
      }
    };

    document.querySelector('.wrong').addEventListener('click', () => select(false));
    document.querySelector('.right').addEventListener('click', () => select(true));
  }, `${variantsArr.length}000`);
};

document.querySelector('form').addEventListener('submit', startGame);
