import { EventEmitter } from 'node:events';

const myEmitter = new EventEmitter();

function greetHandler(name) {
  console.log(`Hello ${name}`);
}

function goodbyeHandler(name) {
  console.log(`Goodbye ${name}`);
}

// Register event listeners
myEmitter.on('greet', greetHandler);
myEmitter.on('goodbye', goodbyeHandler);

// Emit events
myEmitter.emit('greet', 'John');
myEmitter.emit('goodbye', 'John');

// Error handling
myEmitter.on('error', (err) => {
  console.error('An Error Occured:', err);
});

// Simulate error
myEmitter.emit('error', new Error('something went wrong'));
