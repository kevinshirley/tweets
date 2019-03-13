import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTrumpTweets, latestTrumpTweets, fetchHillaryTweets, latestHillaryTweets } from '../../store/actions/tweetsActions';

let trumpTweets = [], hillaryTweets = [], currentTrumpItem, currentHillaryItem;

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      trumpItems: [],
      hillaryItems: [],
    };

    this.concatTrumpTweets = this.concatTrumpTweets.bind(this);
    this.concatHillaryTweets = this.concatHillaryTweets.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tweets.trumpTweets !== currentTrumpItem) {
      this.concatTrumpTweets(this.props.tweets.trumpTweets);
    }

    if (this.props.tweets.hillaryTweets !== currentHillaryItem) {
      this.concatHillaryTweets(this.props.tweets.hillaryTweets);
    }
  }

  concatTrumpTweets(tweet) {
    currentTrumpItem = tweet;
    trumpTweets = [currentTrumpItem].concat(trumpTweets.slice(0, 15));
    this.setState({
      trumpItems: trumpTweets,
    });
    this.props.latestTrumpTweets(this.state.trumpItems);
  }

  concatHillaryTweets(tweet) {
    currentHillaryItem = tweet;
    hillaryTweets = [currentHillaryItem].concat(hillaryTweets.slice(0, 15));
    this.setState({
      hillaryItems: hillaryTweets,
    });
    this.props.latestHillaryTweets(this.state.hillaryItems);
  }

  componentDidMount() {
    this.props.fetchTrumpTweets();
    this.props.fetchHillaryTweets();
  }

  render() {
    return (
      <section className="menu">
        <div className="wrapper">
          <div className="logo">
           <Link to="/"><i className="fab fa-twitter"></i></Link>
          </div>
          <div className="search">
            <i className="fas fa-search"></i>
          </div>
        </div>
      </section>
    );
  }
}

// export default Menu;
// Menu.proptypes = {
//   tweets: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
  tweets: state.tweets,
});

export default connect(mapStateToProps, { fetchTrumpTweets, latestTrumpTweets, fetchHillaryTweets, latestHillaryTweets })(Menu);