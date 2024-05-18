import http from 'node:http';

const PORT = 5010;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
