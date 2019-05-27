// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello WEB19");
});

server.post("/api/users", (req, res) => {
  const { name, bio, created_at, updated_at } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
    return;
  }
  db.insert({ name, bio, created_at, updated_at })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: "There was an error while saving the user to the database."
        });
      return;
    });
});

server.get("/api/users", (req, res) => {
  db.find().then(users =>
    res
      .json({ users })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." })
      )
  );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.json({ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

server.delete("/api/users:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(response => {
      if (response === 0) {
        res
          .status(404)
          .json({ message: "The user with the spefified ID does not exist." });
      }
      res.json({ success: `The user has been removed from the database.` });
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed." });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  db.update(id)
    .then(response => {
      if (response === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
        return;
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
      return;
    });
  if (!name || !bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
    return;
  }
});

server.get("/now", (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

server.listen(5000, () => {
  console.log("API up and running on port 5k");
});
