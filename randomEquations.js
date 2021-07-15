const variantsArr = ['plus', 'minus', 'multiply', 'divide'];

const createArrayOfRandomEquations = (numberOfItems) => {
  const tempArr = [];
  for (let i = 0; i < numberOfItems; i++) {
    const r = Math.floor(Math.random() * variantsArr.length);
    const randomEquation = functionWithRandomParameter(variantsArr[r]);
    tempArr.push(randomEquation);
  }
  return tempArr;
};
const functionWithRandomParameter = (param) => {
  switch (param) {
    case 'plus':
      return plus();
    case 'minus':
      return minus();
    case 'multiply':
      return multiply();
    case 'divide':
      return divide();
  }
};

const getRandomInt = (max) => Math.floor(Math.random() * max);
const randomResult = () => (Math.random() >= 0.5 ? true : false);

const createFakeResult = (number, range = 5) => {
  let temp = [];
  for (let i = number - range; i <= number + range; i++) {
    temp.push(i);
  }
  temp.splice(range, 1);
  return temp[Math.floor(Math.random() * temp.length)];
};

const plus = () => {
  const number1 = getRandomInt(99);
  const number2 = getRandomInt(99);
  const tempRandom = randomResult();
  const result = number1 + number2;
  const resObj = {
    equation: `${number1} + ${number2} = ${tempRandom ? result : createFakeResult(result)}`,
    evaluated: tempRandom ? true : false,
  };
  return resObj;
};
const minus = () => {
  const number1 = getRandomInt(99);
  const number2 = getRandomInt(99);
  const tempRandom = randomResult();
  const result = number1 - number2;
  const resObj = {
    equation: `${number1} - ${number2} = ${tempRandom ? result : createFakeResult(result)}`,
    evaluated: tempRandom ? true : false,
  };
  return resObj;
};
const multiply = () => {
  const number1 = getRandomInt(20);
  const number2 = getRandomInt(9);
  const tempRandom = randomResult();
  const result = number1 * number2;
  const resObj = {
    equation: `${number1} x ${number2} = ${tempRandom ? result : createFakeResult(result)}`,
    evaluated: tempRandom ? true : false,
  };
  return resObj;
};
const divide = () => {
  const number1 = randomNonPrimeNumber(100);
  const number2 = getSecondDivideNumber(number1);
  const tempRandom = randomResult();
  const result = number1 / number2;
  const resObj = {
    equation: `${number1} / ${number2} = ${tempRandom ? result : createFakeResult(result, 1)}`,
    evaluated: tempRandom ? true : false,
  };
  return resObj;
};

const getSecondDivideNumber = (number1) => {
  const temp = [];
  for (let i = 2; i <= number1; i++) {
    number1 % i === 0 && temp.push(i);
  }
  const t1 = temp[getRandomInt(temp.length - 1)];
  return t1;
};

const randomNonPrimeNumber = (n) => {
  const arr = [...Array(n).keys()].map((n) => n + 1);
  const isPrime = (i) => {
    if (i === 1) {
      return false;
    } else if (i === 2) {
      return true;
    } else {
      for (let x = 2; x < i; x++) {
        if (i % x === 0) {
          return false;
        }
      }
      return true;
    }
  };
  const filterPrime = (arr) => {
    const filtered = arr.filter((el) => !isPrime(el));
    return filtered.slice(1);
  };
  const randomNumber = () => {
    const filtered = filterPrime(arr);
    return filtered[Math.floor(Math.random() * filtered.length)];
  };
  return randomNumber();
};

export { createArrayOfRandomEquations };
