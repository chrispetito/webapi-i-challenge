// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello WEB19");
});

server.get("/api/users", (req, res) => {
  db.find().then(users => res.json({ users }));
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(user => {
        if (user.length === 0) {
            return res.status(404).json({ message: 'The user with the specified ID does not exist.'})
        }
        res.json({ user })
    })
    .catch(err => {
        res.status(500).json({ message: 'The user information could not be retrieved.'})
    })
})

server.get("/now", (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

server.listen(5000, () => {
  console.log("API up and running on port 5k");
});
