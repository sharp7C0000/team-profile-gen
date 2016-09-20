import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Title extends React.Component {

  render() {
    return  <div className="comp-title level">
      <div className="level-left">
        <div className="level-item">
          <p className="title">Sales department 1 - Team A</p>
        </div>
      </div>

      <div className="level-right">
        <div className="level-item">
          <button className="button is-small is-success is-outlined">
            <span className="icon is-small">
              <i className="fa fa-pencil"></i>
            </span>
            <span>edit</span>
          </button>
        </div>
      </div>
    </div>
  }
}

export default (Title);

              