// Import required modules
const connect = require('connect');
const url = require('url');

// Create the calculate function
function calculate(req, res) {
  // Parse URL and query parameters
  const query = url.parse(req.url, true).query;

  const method = query.method;
  const x = parseFloat(query.x);
  const y = parseFloat(query.y);

  res.setHeader('Content-Type', 'text/plain');

  // Validation
  if (isNaN(x) || isNaN(y) || !method) {
    res.end('Error: Please provide valid query parameters: method, x, and y.\nExample: /lab2?method=add&x=10&y=5');
    return;
  }

  // Perform calculation based on method
  let result;
  let symbol;

  switch (method.toLowerCase()) {
    case 'add':
      result = x + y;
      symbol = '+';
      break;
    case 'subtract':
      result = x - y;
      symbol = '-';
      break;
    case 'multiply':
      result = x * y;
      symbol = '*';
      break;
    case 'divide':
      if (y === 0) {
        res.end('Error: Cannot divide by zero.');
        return;
      }
      result = x / y;
      symbol = '/';
      break;
    default:
      res.end('Error: Invalid method. Use add, subtract, multiply, or divide.');
      return;
  }

  // Display the result
  res.end(`${x} ${symbol} ${y} = ${result}`);
}

// Create connect app
const app = connect();

// Use the calculate function for /lab2 path
app.use('/lab2', calculate);

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
