import { createElement, appendToDOM } from './utils.js';

export const createGamePage = () => {
  document.querySelector('.page').remove();
  const page = createElement('div', 'page');
  const itemContainer = createElement('div', 'item-container');
  const item = createElement('div', 'item', {}, '');
  const questionNumber = createElement('h4', 'question-number', {}, '');
  const itemFooter = createElement('footer', 'item-footer');
  const wrongBtn = createElement('button', 'wrong', {}, 'Wrong');
  const rightBtn = createElement('button', 'right', {}, 'Right');
  const gameTimerEl = createElement('span', 'equations-timer', {}, `0.0s`);

  appendToDOM(
    new Map([
      [itemFooter, [wrongBtn, rightBtn]],
      [itemContainer, [item]],
      [page, [questionNumber, itemContainer, itemFooter, gameTimerEl]],
      [document.querySelector('.container'), [page]],
    ])
  );
};
