import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Member extends React.Component {

  render() {
    return  <div className="comp-member media">
      <div className="media-left">
        <p className="image is-128x128">
          <img src="http://placehold.it/128x128"/>
        </p>
      </div>

      <div className="media-content">
        <div className="content">
          <div className="title is-4">{this.props.name}</div>
          <div className="subtitle is-5">{this.props.position}</div>
          <p>
            {this.props.desc}
          </p>
        </div>
      </div>

      <div className="media-right">
        <button className="button is-small is-success is-outlined">
          <span className="icon is-small">
            <i className="fa fa-pencil"></i>
          </span>
          <span>edit</span>
        </button>&nbsp;
        <button className="button is-small is-danger is-outlined">
          <span className="icon is-small">
            <i className="fa fa-trash"></i>
          </span>
          <span>remove</span>
        </button>
      </div>

    </div>
  }
}

export default (Member);