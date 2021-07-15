import { createElement } from './utils.js';

export const createSplashPage = (valuesArr) => {
  document.querySelector('.page')?.remove();

  const page = createElement('div', 'page');

  const form = createElement('form');

  const radioButtonsContainer = createElement('div', 'radioButtons-container');

  valuesArr.forEach(({ questions, bestScore }) => {
    const radioContainer = createElement('div', 'radio-container');
    const label = createElement(
      'label',
      null,
      { for: `value-${questions}` },
      `${questions} Questions`
    );
    const input = createElement('input', null, {
      type: 'radio',
      name: 'questions',
      value: questions,
      id: `value-${questions}`,
    });
    const spanContainer = createElement('span', 'best-score');
    const spanTitle = createElement('span', null, {}, 'Best Score');
    const spanScore = createElement(
      'span',
      'best-score-value',
      {},
      `${Number(bestScore).toFixed(1)}s`
    );
    spanContainer.append(spanTitle, spanScore);
    radioContainer.append(label, input, spanContainer);
    radioButtonsContainer.appendChild(radioContainer);
  });

  const startBtn = createElement('button', 'startBtn', { type: 'submit' }, 'Start');

  form.append(radioButtonsContainer, startBtn);
  page.appendChild(form);
  document.querySelector('.container').appendChild(page);
};
