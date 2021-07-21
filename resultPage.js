import { createElement, appendToDOM } from './utils.js';

export const createResultPage = ([rightGuess, wrongGuess], gameTime) => {
  const penaltyForWrongGuess = 3;
  const penalty = penaltyForWrongGuess * wrongGuess;
  const final = gameTime + penalty;

  document.querySelector('.page').remove();

  const page = createElement('div', 'page');
  const scoreContainer = createElement('div', 'score-container');
  const rightGuessEl = createElement(
    'h1',
    'right-guess',
    {},
    `You got ${rightGuess} right answers`
  );
  const finalTime = createElement('h2', 'final-time', {}, ` Your Time : ${final.toFixed(1)}s`);
  const timeContainerEl = createElement('div', 'time-container');
  const baseTime = createElement('h4', 'base-time', {}, `Game Time : ${gameTime.toFixed(1)}s`);
  const penalyTime = createElement(
    'h4',
    'penalty-time',
    {},
    `Penalty Time : ${penalty.toFixed(1)}s`
  );
  const scoreFooter = createElement('footer', 'score-footer');
  const playAgainBtn = createElement('button', 'playAgainBtn', {}, 'Play Again');

  appendToDOM(
    new Map([
      [scoreFooter, [playAgainBtn]],
      [timeContainerEl, [baseTime, penalyTime]],
      [scoreContainer, [rightGuessEl, finalTime, timeContainerEl]],
      [page, [scoreContainer, scoreFooter]],
      [document.querySelector('.container'), [page]],
    ])
  );

  return final;
};
