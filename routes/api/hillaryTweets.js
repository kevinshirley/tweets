// const express = require('express');
// const router = express.Router();
const Twitter = require('twitter');

// @route   GET /api/tweets
// @desc    tweets page route
// @access  Public
// router.get('/', (req, res) => res.json({ msg: 'twitter api works' }));

module.exports = (app, socket) => {
  let twitter = new Twitter({
    consumer_key: 'vZKJfAwwX9aOWfFqtEnPd3x9E',
    consumer_secret: '9oKWUBO2qiZSVj4lDUn0oUNphZiEtmKfX3rq6ZWxEtWUa9nyz0',
    access_token_key: '985343007812653056-t8PL5gg4W64QnucJ9057UX40QOAUZOw',
    access_token_secret: 'FRc4S9B2lwdfEuzmzXL6ByiavlalSRnTRSOVH6IfpazW7'
  });

  let socketConnection;
  let twitterStream;

  // app.locals.searchTerm = 'Javascript'; //default search term for twitter stream
  // app.locals.searchTerm = 25073877; // trump
  app.locals.searchTerm = 1339835893; // hillary
  // app.locals.searchTerm = [1339835893, 25073877]; // both
  app.locals.showRetweets = false; // default

  /**
   * Resumes twitter stream
   */
  const stream = () => {
    console.log('Resuming for ' + app.locals.searchTerm);
    twitter.stream('statuses/filter', { follow: app.locals.searchTerm }, (stream) => {
      stream.on('data', (tweet) => {
        sendMessage(tweet);
      });

      stream.on('error', (error) => {
        console.log(error);
      });

      twitterStream = stream;
    });
  };

  /**
   * Sets search term for twitter stream
   */
  app.post('/setSearchTerm', (req, res) => {
    let term = req.body.term;
    app.locals.searchTerm = term;
    twitterStream.destroy();
    stream();
  });

  /**
   * Pauses the twitter stream
   */
  app.post('/pause', (req, res) => {
    console.log('Pause');
    twitterStream.destroy();
  });

  /**
   * Resumes the twitter stream
   */
  app.post('/resume', (req, res) => {
    console.log('Resume');
    stream();
  });

  /**
   * Establish socket connection
   */
  socket.on('connection', io => {
    socketConnection = io;
    stream();
    io.on('connection', () => console.log('Client connected'));
    io.on('disconnect', () => console.log('Client disconnected'));
  });

  /**
   * Emits data from stream
   * @param {String} msg
   */
  const sendMessage = (msg) => {
    if (msg.text.includes('RT')) {
      return;
    }
    socketConnection.emit('hillaryTweets', msg);
  }
};

// module.exports = router;
