import { createElement } from './utils.js';

export const createCountdownPage = (intervalWords) => {
  document.querySelector('.page').remove();
  const page = createElement('div', 'page');
  const countdown = createElement('h1', 'countdown');
  page.appendChild(countdown);
  document.querySelector('.container').appendChild(page);
  countdown.textContent = intervalWords[0];

  let tempCount = 1;
  const tempTimer = setInterval(() => {
    countdown.textContent = intervalWords[tempCount++];
    if (tempCount === intervalWords.length) {
      clearInterval(tempTimer);
    }
  }, 1000);
};
