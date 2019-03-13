import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import './App.scss';
import './App.css';

import Menu from './components/common/menu';
import Home from './components/home';
import TrumpTweets from './components/tweets/trumpTweets';
import HillaryTweets from './components/tweets/hillaryTweets';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Menu />
            <Route exact path="/" component={ Home } />
            <Route exact path="/trump" component={ TrumpTweets } />
            <Route exact path="/hillary" component={ HillaryTweets } />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
