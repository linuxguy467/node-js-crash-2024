// import fs from 'node:fs';
import fs from 'node:fs/promises';

// readFile() - callback
// fs.readFile('./test.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// readFileSync() - Synchronous version
// const data = fs.readFileSync('./test.txt', 'utf8');
// console.log(data);

// readFile() - Promise .then()
// fs.readFile('./test.txt', 'utf8')
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

// readfile() - async/await
const readFile = async () => {
  try {
    const data = await fs.readFile('./test.txt', 'utf8');
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// writeFile()
const writeFile = async () => {
  try {
    await fs.writeFile('./test.txt', 'Hello, I am writing to this file');
    console.log('File written to...');
  } catch (error) {
    console.error(error);
  }
};

// appendFile()
const appendFile = async () => {
  try {
    await fs.appendFile('./test.txt', '\nThis is appended text');
    console.log('File appended to...');
  } catch (error) {
    console.error(error);
  }
};

writeFile();
appendFile();
readFile();
