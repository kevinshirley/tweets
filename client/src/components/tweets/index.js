import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import badge from '../../assets/badge.svg';

class TweetList extends Component {
  render() {
    return (
      <section className="tweetList">
        <ul>
          <li>
            <Link to="/trump" >Donald Trump <span className="badge"><img src={badge} alt="Badge" /></span></Link>
            <span className="username">@RealDonaldTrump</span>
          </li>
          <li>
            <Link to="/hillary">Hillary Clinton <span className="badge"><img src={badge} alt="Badge" /></span></Link>
            <span className="username">@HillaryClinton</span>
          </li>
        </ul>
      </section>
    );
  }
}

export default TweetList;