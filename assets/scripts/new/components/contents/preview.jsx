import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Title  from './title.jsx';
import Member from './member.jsx';

class Preview extends React.Component {

  render() {
    return  <div className="comp-preview">

      <Title></Title>

      {/** members container */}
      <div style={{marginTop:"30px"}}>
        {
          (() => {
            if(this.props.members.length == 0) {
              return  <section className="hero is-light is-medium">
                  <div className="hero-body has-text-centered">
                    <div className="container">
                      <h3 className="title placeholder">
                        No team members
                      </h3>
                    </div>
                  </div>
                </section>
            } else {
              return this.props.members.map((member, index) => {
                return  <Member key={index}></Member>
              });
            }
          })()
        }
      </div>
    </div>
  }
}

function select(state) {
  return {
    members: state.members
  };
}

export default connect(select)(Preview);