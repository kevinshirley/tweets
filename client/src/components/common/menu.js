import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTrumpTweets, latestTrumpTweets } from '../../store/actions/tweetsActions';

let trumpTweets = [], currentItem;

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      trumpItems: [], 
      searchTerm: "Donald Trump" 
    };

    this.concatTrumpTweets = this.concatTrumpTweets.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tweets.trumpTweets !== currentItem) {
      this.concatTrumpTweets(this.props.tweets.trumpTweets);
    }
  }

  concatTrumpTweets(tweet) {
    currentItem = tweet;
    trumpTweets = [currentItem].concat(trumpTweets.slice(0, 15));
    this.setState({
      trumpItems: trumpTweets,
    });
    console.log(this.state.trumpItems);
    this.props.latestTrumpTweets(this.state.trumpItems);
  }

  componentDidMount() {
    this.props.fetchTrumpTweets();
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

export default connect(mapStateToProps, { fetchTrumpTweets, latestTrumpTweets })(Menu);