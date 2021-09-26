// CommonJS syntax
// WORKS when `node get_stuff`
const { v4: uuidv4 } = require('uuid');

// ES6 module syntax
// CANT execute `node get_stuff`
// SyntaxError: Cannot use import statement outside a module
// import { v4 as otherUuidv4 } from 'uuid';

module.exports = { uuidv4 };
