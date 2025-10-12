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
    if (isNaN(x) || isNaN(y) || !method) {
        res.end('Error: Please provide valid query parameters: method, x, and y.\nExample: /lab2?method=add&x=10&y=5');
        return;
}


