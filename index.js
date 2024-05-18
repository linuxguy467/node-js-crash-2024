import getPosts, { getPostsLength } from './postController.js';
import { getObjectsWithoutId } from './utils.js';

console.log(getObjectsWithoutId(getPosts()));
console.log(getPostsLength());

// const { generateRandomNumber, celciusToFahrenheit } = require('./utils');

// console.log(`Random Number: ${generateRandomNumber()}`);

// console.log(`Celcius to Fahrenheit: ${celciusToFahrenheit(0)}`);
