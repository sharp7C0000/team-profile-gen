import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Title  from './title.jsx';
import Member from './member.jsx';

class Preview extends React.Component {

  render() {
    return  <div className="comp-preview">

      <Title></Title>

      <div style={{marginTop:"30px"}}>
        {/** placeholder **/}
        <section className="hero is-light is-medium">
          <div className="hero-body has-text-centered">
            <div className="container">
              <h3 className="title placeholder">
                No team members
              </h3>
            </div>
          </div>
        </section>
      </div>

    </div>
  }
}

export default (Preview);