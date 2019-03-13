const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const server = http.createServer(app);
const socket = socketio(server);
const trumpTweets = require('./routes/api/trumpTweets')(app, socket);
const hillaryTweets = require('./routes/api/hillaryTweets')(app, socket);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5005;

server.listen(port, () => console.log(`Server running on port ${port}`));