import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Title  from './title.jsx';
import Member from './member.jsx';

class Preview extends React.Component {

  render() {
    return  <div className="comp-preview">

      <Title></Title>
      
      

    </div>
  }
}

export default (Preview);