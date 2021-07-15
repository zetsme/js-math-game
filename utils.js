const createElement = (tag, classes = '', attributes = {}, textCotent = '') => {
  const setAttrs = (elem, attrs) =>
    Object.keys(attrs).map((key) => elem.setAttribute(key, attrs[key]));
  const $ = document.createElement(tag);
  if (classes) $.className = classes;
  if (Object.keys(attributes).length > 0) {
    setAttrs($, attributes);
  }
  $.textContent = textCotent;
  return $;
};

const findCoincidencesinArrays = (arr1, arr2) => {
  const tempArr = arr1.filter((item, index) => item === arr2[index]);
  const rightValues = tempArr.length;
  const wrongValues = arr1.length - tempArr.length;
  return [rightValues, wrongValues];
};

export { createElement, findCoincidencesinArrays };
