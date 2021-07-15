export const compareAndSaveToLocalStorage = (questionAmount, result) => {
  const bestScoresArr = JSON.parse(localStorage.getItem('bestScores'));

  bestScoresArr.forEach((i) => {
    if (Number(questionAmount) === i.questions) {
      const savedBestScore = Number(i.bestScore);
      if (savedBestScore === 0 || result < savedBestScore) {
        i.bestScore = result;
      }
    }
  });
  localStorage.setItem('bestScores', JSON.stringify(bestScoresArr));
};

export const getSavedBestScores = (valuesArr) => {
  if (localStorage.getItem('bestScores')) {
    return JSON.parse(localStorage.getItem('bestScores'));
  } else {
    const tempArr = valuesArr.map((i) => {
      return { questions: i, bestScore: '0.0' };
    });
    localStorage.setItem('bestScores', JSON.stringify(tempArr));
    return JSON.parse(localStorage.getItem('bestScores'));
  }
};
