import socketIOClient from "socket.io-client";

import { FETCH_TRUMP_TWEETS, LATEST_TRUMP_TWEETS, FETCH_HILLARY_TWEETS, LATEST_HILLARY_TWEETS } from './index';

export const fetchTrumpTweets = () => dispatch => {
  const socket = socketIOClient('http://localhost:5005/');

  socket.on('connect', () => {
    console.log("Socket Connected");
    socket.on("trumpTweets", data => {
      // console.info(data);
      dispatch({
        type: FETCH_TRUMP_TWEETS,
        payload: data
      })
    });
  });
  socket.on('disconnect', () => {
    socket.off("trumpTweets")
    socket.removeAllListeners("trumpTweets");
    console.log("Socket Disconnected");
  });
}

export const latestTrumpTweets = (tweets) => dispatch => {
  // console.log(tweets);
  dispatch({
    type: LATEST_TRUMP_TWEETS,
    payload: tweets
  });
}

export const fetchHillaryTweets = () => dispatch => {
  const socket = socketIOClient('http://localhost:5005/');

  socket.on('connect', () => {
    console.log("Socket Connected");
    socket.on("hillaryTweets", data => {
      // console.info(data);
      dispatch({
        type: FETCH_HILLARY_TWEETS,
        payload: data
      })
    });
  });
  socket.on('disconnect', () => {
    socket.off("hillaryTweets")
    socket.removeAllListeners("hillaryTweets");
    console.log("Socket Disconnected");
  });
}

export const latestHillaryTweets = (tweets) => dispatch => {
  // console.log(tweets);
  dispatch({
    type: LATEST_HILLARY_TWEETS,
    payload: tweets
  });
}