import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Nav extends React.Component {

  render() {
    return  <div className="nav">
      <div className="nav-left">
        <a className="nav-item is-brand" href="/">
          Team Profile Page Generator
        </a>
      </div>
    </div>  
  }
}


export default (Nav);