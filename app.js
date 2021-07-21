import { createSplashPage } from './splashPage.js';
import { createCountdownPage } from './countdownPage.js';
import { createGamePage } from './gamePage.js';
import { createResultPage } from './resultPage.js';
import { createArrayOfRandomEquations } from './randomEquations.js';
import { findCoincidencesInArrays } from './utils.js';
import { compareAndSaveToLocalStorage, getSavedBestScores } from './localStorage.js';
const valuesArr = [10, 20, 30];
const variantsArr = [3, 2, 1, 'GO'];

let bestScoresArr = getSavedBestScores(valuesArr);
const getRadioValue = createSplashPage(bestScoresArr);

const startGame = (e) => {
  e.preventDefault();
  const questionAmount = getRadioValue() || valuesArr[0];
  createCountdownPage(variantsArr);
  setTimeout(() => {
    let equationsCount = 0;
    let gameTime = 0;
    const arrayOfRandomEquations = createArrayOfRandomEquations(questionAmount);
    const playerGuessArr = [];
    createGamePage();

    const createNewItem = (count) => {
      document.querySelector('.item').textContent = arrayOfRandomEquations[count].equation;
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
        const rightWrongValues = findCoincidencesInArrays(
          playerGuessArr,
          arrayOfRandomEquations.map((i) => i.evaluated)
        );
        const timeTotal = createResultPage(rightWrongValues, gameTime);
        compareAndSaveToLocalStorage(questionAmount, timeTotal);
        document.querySelector('.playAgainBtn').addEventListener('click', () => {
          bestScoresArr = getSavedBestScores(valuesArr);
          createSplashPage(bestScoresArr);
          document.querySelector('form', addEventListener('submit', startGame));
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
