import React, { Component } from 'react';
import TweetList from '../tweets';

class Home extends Component {
  render() {
    return (
      <section className="home">
        <h2>Home</h2>
        <TweetList />
      </section>
    );
  }
}

export default Home;