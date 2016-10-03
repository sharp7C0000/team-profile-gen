import React from 'react';
import { connect } from 'react-redux';

require("../../../../scss/new/preview.scss");

import Title  from './title.jsx';
import Member from './member.jsx';

import ConfirmModal from '../../../common/components/confirm_modal.jsx';

import { removeMember, updateMember, updateTitle } from '../../redux/actions';

class Preview extends React.Component {

  render() {

    return  <div className="comp-preview">

      <Title
        value={this.props.title}
        onApplyEdit={(value) => this.props.onUpdateTitle(value)}
      ></Title>

      {/** members container */}
      <div className="member-container">
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
                key={index} image={member.image} name={member.name}
                position={member.position} desc={member.desc}
                onApplyRemove={() => this.props.onRemoveMem(index)}
                onApplyEdit={(values) => this.props.onUpdateMem(index, values)}
              ></Member>
              });
            }
          })()
        }
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    title   : state.page.title,
    members : state.page.members
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTitle (value) {
      dispatch(updateTitle(value));
    },

    onRemoveMem (index) {
      dispatch(removeMember(index));
    },

    onUpdateMem (index, values) {
      dispatch(updateMember(index, values));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);