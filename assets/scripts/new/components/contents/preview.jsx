import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Title  from './title.jsx';
import Member from './member.jsx';

import { removeMember, updateMember, updateTitle } from '../../redux/actions';

class Preview extends React.Component {

  updateTitle (value) {
    const { dispatch } = this.props;
    dispatch(updateTitle(value));
  }

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

      <Title
        value={this.props.title}
        onApplyEdit={(value) => this.updateTitle(value)}
      ></Title>

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
                image={member.image}
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
    title  : state.page.title,
    members: state.page.members
  };
}

export default connect(select)(Preview);