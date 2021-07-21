import { createElement, appendToDOM } from './utils.js';

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

    appendToDOM(
      new Map([
        [spanContainer, [spanTitle, spanScore]],
        [radioContainer, [label, input, spanContainer]],
        [radioButtonsContainer, [radioContainer]],
      ])
    );
  });

  const startBtn = createElement('button', 'startBtn', { type: 'submit' }, 'Start');

  appendToDOM(
    new Map([
      [form, [radioButtonsContainer, startBtn]],
      [page, [form]],
      [document.querySelector('.container'), [page]],
    ])
  );

  document.querySelector('.radioButtons-container').addEventListener('click', () => {
    document.querySelectorAll('.radio-container').forEach((el) => {
      el.classList.remove('selected-radio-container');
      if (el.children[1].checked) {
        el.classList.add('selected-radio-container');
      }
    });
  });

  const getRadioValue = () => {
    let questionAmount;
    document
      .querySelector('.radioButtons-container')
      .querySelectorAll('input')
      .forEach((input) => {
        if (input.checked) {
          questionAmount = input.value;
        }
      });
    return questionAmount;
  };

  return getRadioValue;
};
