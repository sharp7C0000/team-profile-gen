import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { addMember } from '../../redux/actions';

class ControlPane extends React.Component {

  add (e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(addMember());
  }

  render() {
    return  <div className="comp-control-pane">
      
      <div className="panel">
        
        <p className="panel-heading">
          Control panel
        </p>

        <a className="panel-block" href="#" onClick={(e) => this.add(e)}>
          <span className="panel-icon">
            <i className="fa fa-plus"></i>
          </span>
          Add member
        </a>

        <div className="panel-block">
          <div className="level">

            <div className="level-left">
              <div className="level-item">
                <span className="panel-icon">
                  <i className="fa fa-list-alt"></i>
                </span>
                Custom Fields
              </div>
            </div>

            <div className="level-right">
              <div className="level-item">
                <button className="button is-info is-outlined is-small">
                  <span className="icon is-small">
                    <i className="fa fa-plus"></i>
                  </span>
                  <span>
                    add
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/*<div className="panel-block">
          <ul className="menu-list">
            <li>Team</li>
            <li>Age</li>
            <li>Height</li>
          </ul>
        </div>
       */}

        <div className="panel-block">
          <button className="button is-primary is-fullwidth">
            <span className="icon is-small">
              <i className="fa fa-floppy-o"></i>
            </span>
            <span>
              Save Page
            </span>
          </button>
        </div>
        
      </div>
    
    </div>
  }
}

function select(state) {
  return {
  };
}

export default connect(select)(ControlPane);