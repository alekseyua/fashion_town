function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  try {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  } catch (e) {
    return null;
  }
}

function removeCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

function isTargetBlank(isBlank) {
  return isBlank ? '_blank' : '';
}

function initialsName(first_name, last_name) {
  return `${first_name[0]}${last_name[last_name.length - 1]}`;
}

function unicArr(arr) {
  const result = [];
  const duplicatesIndices = [];

  // Перебираем каждый элемент в исходном массиве
  arr.forEach((current, index) => {
    if (duplicatesIndices.includes(index)) return;

    result.push(current);

    // Сравниваем каждый элемент в массиве после текущего
    for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
      const comparison = arr[comparisonIndex];
      const currentKeys = Object.keys(current);
      const comparisonKeys = Object.keys(comparison);

      // Проверяем длину массивов
      if (currentKeys.length !== comparisonKeys.length) continue;

      // Проверяем значение ключей
      const currentKeysString = currentKeys.sort().join('').toLowerCase();
      const comparisonKeysString = comparisonKeys.sort().join('').toLowerCase();
      if (currentKeysString !== comparisonKeysString) continue;

      // Проверяем индексы ключей
      let valuesEqual = true;
      for (let i = 0; i < currentKeys.length; i++) {
        const key = currentKeys[i];
        if (current[key] !== comparison[key]) {
          valuesEqual = false;
          break;
        }
      }
      if (valuesEqual) duplicatesIndices.push(comparisonIndex);
    }
  });
  return result;
}

const debounce = (functionContext, wait, immediate) => {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) functionContext.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) functionContext.apply(context, args);
  };
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
  return true;
};

const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
  return true;
};

const rotateMatrix = (matrix) => {
  var result = [],
    y,
    h,
    x,
    w;
  for (y = 0, h = matrix.length; y < h; y++) {
    for (x = 0, w = matrix[y].length; x < w; x++) {
      if (!result[x]) result[x] = [];
      result[x][y] = matrix[y][x];
    }
  }
  return result;
};
export {
  rotateMatrix,
  setCookie,
  getCookie,
  removeCookie,
  isTargetBlank,
  initialsName,
  unicArr,
  debounce,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
};
