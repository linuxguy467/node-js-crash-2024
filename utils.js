function generateRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function celciusToFahrenheit(celcius) {
  return (celcius * 9) / 5 + 32;
}

/**
 *
 * @param {any[]} objArr
 * @returns
 */
function getObjectsWithoutId(objArr) {
  return objArr.map(({ id, ...obj }) => obj);
}

export { generateRandomNumber, celciusToFahrenheit, getObjectsWithoutId };
