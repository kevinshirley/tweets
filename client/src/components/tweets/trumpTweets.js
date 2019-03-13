import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import CardComponent from './CardComponent';
import { fetchTrumpTweets, latestTrumpTweets } from '../../store/actions/tweetsActions';

class TrumpTweets extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], searchTerm: "Donald Trump" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  componentDidMount() {
    this.props.fetchTrumpTweets();

    const socket = socketIOClient('http://localhost:5005/');

    socket.on('connect', () => {
      console.log("Socket Connected");
      socket.on("trumpTweets", data => {
        // console.info(data);
        let newList = [data].concat(this.state.items.slice(0, 15));
        this.setState({ items: newList });
      });
    });
    socket.on('disconnect', () => {
      socket.off("trumpTweets")
      socket.removeAllListeners("trumpTweets");
      console.log("Socket Disconnected");
    });
  }

  componentWillUnmount() {
    const socket = socketIOClient('http://localhost:5005/');
    socket.on('disconnect', () => {
      socket.off("trumpTweets")
      socket.removeAllListeners("trumpTweets");
      console.log("Socket Disconnected");
    });
  }

  render() {
    console.log(this.props.tweets.trumpLatest);
    let items = this.state.items;

    let itemsCards = (
      <div className="items">
        {items.map((x, i) =>
          <CardComponent key={i} data={x} />
        )}
      </div>
    );

    let profileCard = (
      <div className="profileCard">
        <div className="picture">
          <i className="material-icons">photo_camera</i>
        </div>
        <div className="name">
          <h4>{this.state.searchTerm}</h4>
        </div>
      </div>
    );

    let feedButton = (
      <Link to="/">Back to Feed</Link>
    );

    let feed = (
      <div className="feedButton">
        {
          items.length > 0 ? feedButton : null
        }
      </div>
    );

    let loading = (
      <div>
        <p className="flow-text">Listening to Streams</p>
      </div>
    );

    return (
      <div className="tweet-container">
        <div className="tweet-container-title">
          <h2>Profile</h2>
        </div>
        <div className="tweet-content">
          <div className="tweets-sidemenu">
            <div className="input-field">
              {profileCard}
              {
                items.length > 0 ? feed : null
              }
            </div>
          </div>
          <div className="tweet-items">
            <div className="items-container">
              {
                items.length > 0 ? itemsCards : loading
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// TweetList.proptypes = {
//   tweets: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
  tweets: state.tweets,
});

export default connect(mapStateToProps, { fetchTrumpTweets, latestTrumpTweets })(TrumpTweets);