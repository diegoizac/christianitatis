// Simple script to check if the development server is running
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5173,
  path: '/',
  method: 'HEAD'
};

const req = http.request(options, (res) => {
  console.log('Server status:', res.statusCode);
  console.log('Server is running at http://localhost:5173/');
  console.log('Please open this URL in your browser to see the preview.');
});

req.on('error', (e) => {
  console.error('Server check failed:', e.message);
  console.log('The development server might not be running.');
  console.log('Please run "npm run dev" to start the server.');
});

req.end();
