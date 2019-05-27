// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello WEB19');
})

server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now);
})

server.listen(5000, () => {
    console.log('API up and running on port 5k')
})
