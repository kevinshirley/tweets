const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tweets = require('./routes/api/tweets');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use routes
app.use('/api/tweets', tweets);

app.get('/', (req, res) => res.send('Hello world'));

const port = 5005;

app.listen(port, () => console.log(`Server running on port ${port}`));