import React from 'react';
import { connect } from 'react-redux';

import Contents from "./contents.jsx";

class App extends React.Component {
  render() {
    return  <Contents></Contents>
  }
}

export default connect()(App);