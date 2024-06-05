import { createServer } from 'node:http';

const PORT = process.env.PORT;

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Jim Doe' },
];

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

// User not found handler
const userNotFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'User not found' }));
  res.end();
};

// Invalid Payload handler
const isUserValid = (user, req, res) => {
  if (!('name' in user)) {
    res.statusCode = 400;
    res.write(
      JSON.stringify({
        message: 'User does not have a `name` field',
      })
    );
    res.end();
    return false;
  } else if (user.name === '') {
    res.statusCode = 400;
    res.write(
      JSON.stringify({
        message: 'the `name` field cannot be empty',
      })
    );
    res.end();
    return false;
  } else {
    return true;
  }
};

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

// Route handler for POST /api/users
const createUserHandler = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      const newUser = JSON.parse(body);

      if (isUserValid(newUser, req, res)) {
        const nextId = users.length + 1;
        newUser.id = nextId;

        users.push(newUser);

        res.statusCode = 201;
        res.write(JSON.stringify({ message: 'User created successfully' }));
        res.end();
      }
    } catch (err) {
      console.error(err);
      res.statusCode = 400;
      res.write(
        JSON.stringify({ message: `Error creating user: ${err.message}` })
      );
      res.end();
    }
  });
};

// Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
  const id = req.url.split('/')[3];
  const user = users.find((user) => user.id === parseInt(id));

  if (user) {
    res.write(JSON.stringify(user));
    res.end();
  } else {
    userNotFoundHandler(req, res);
  }
};

// Route handler for PUT /api/users/:id
const updateUserHandler = (req, res) => {
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
        if (isUserValid(newUser, req, res)) {
          user.name = newUser.name;
          users[idx] = user;

          res.statusCode = 200;
          res.write(JSON.stringify({ message: 'User updated successfully' }));
          res.end();
        }
      } catch (err) {
        console.error(err);
        res.statusCode = 400;
        res.write(
          JSON.stringify({
            message: `Error updating user: ${err.message}`,
          })
        );
        res.end();
      }
    });
  } else {
    userNotFoundHandler(req, res);
  }
};

// Route handler for DELETE /api/users/:id
const deleteUserHandler = (req, res) => {
  const id = req.url.split('/')[3];
  const user = users.find((user) => user.id === parseInt(id));

  if (user) {
    const filteredUsers = users.filter((user) => user.id !== parseInt(id));
    users = filteredUsers;

    res.statusCode = 200;
    res.write(JSON.stringify({ message: 'User deleted successfully' }));
    res.end();
  } else {
    userNotFoundHandler(req, res);
  }
};

// Route not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'Route not found' }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === '/api/users' && req.method === 'GET') {
        getUsersHandler(req, res);
      } else if (req.url === '/api/users' && req.method === 'POST') {
        createUserHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === 'GET'
      ) {
        getUserByIdHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === 'PUT'
      ) {
        updateUserHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === 'DELETE'
      ) {
        deleteUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
