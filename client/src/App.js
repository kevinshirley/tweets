import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import './App.css';

import Home from './components/home';
import Menu from './components/common/menu';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* menu */}
          <Menu />
          {/* /home */}
          <Route exact path="/" component={ Home } />
        </div>
      </Router>
    );
  }
}

export default App;
