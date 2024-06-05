import { createServer } from 'node:http';

const PORT = process.env.PORT;

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Jim Doe' },
];

const server = createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url === '/api/users' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const newUser = JSON.parse(body);

        if (newUser.name) {
          const nextId = users.length + 1;
          newUser.id = nextId;

          users.push(newUser);

          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 201;
          res.write(JSON.stringify({ message: 'User created successfully' }));
          res.end();
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 400;
          res.write(
            JSON.stringify({ message: 'Payload does not have a `name` field' })
          );
          res.end();
        }
      } catch (err) {
        console.error(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.write(
          JSON.stringify({ message: `Error creating user: ${err.message}` })
        );
        res.end();
      }
    });
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 404;
      res.write(JSON.stringify({ message: 'User not found' }));
      res.end();
    }
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));

    if (user) {
      const idx = users.findIndex((user) => user.id === parseInt(id));
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const newUser = JSON.parse(body);
          if (newUser.name) {
            user.name = newUser.name;
            users[idx] = user;

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.write(JSON.stringify({ message: 'User updated successfully' }));
            res.end();
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            res.write(
              JSON.stringify({
                message: 'Payload does not have a `name` field',
              })
            );
            res.end();
          }
        } catch (err) {
          console.error(err);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 400;
          res.write(
            JSON.stringify({ message: `Error updating user: ${err.message}` })
          );
          res.end();
        }
      });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 404;
      res.write(JSON.stringify({ message: 'User not found' }));
      res.end();
    }
  } else if (
    req.url.match(/\/api\/users\/([0-9]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));

    if (user) {
      const filteredUsers = users.filter((user) => user.id !== parseInt(id));
      users = filteredUsers;

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.write(JSON.stringify({ message: 'User deleted successfully' }));
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 404;
      res.write(JSON.stringify({ message: 'User not found' }));
      res.end();
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
