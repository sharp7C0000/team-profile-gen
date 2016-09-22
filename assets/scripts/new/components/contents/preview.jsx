import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Title  from './title.jsx';
import Member from './member.jsx';

import { removeMember, updateMember } from '../../redux/actions';

class Preview extends React.Component {

  removeMem (index) {
    const { dispatch } = this.props;
    dispatch(removeMember(index));
  }

  updateMem (index, values) {
    const { dispatch } = this.props;
    dispatch(updateMember(index, values));
  }

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
                return  <Member 
                key={index} 
                onClickRemove={() => this.removeMem(index)}
                onApplyEdit={(values) => this.updateMem(index, values)}
                name={member.name}
                position={member.position}
                desc={member.desc}
              ></Member>
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