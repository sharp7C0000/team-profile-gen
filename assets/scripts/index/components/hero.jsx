import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

require("../../../scss/index/hero.scss");

class Hero extends React.Component {

  redirectToProfilePage (e) {
    const node = ReactDOM.findDOMNode(this.refs.pageIdInput);
    const text = node.value.trim();
    alert(text);
  }

  checkValidPageId (e) {
    console.log("hi", e);
  }

  render() {

    const { dispatch, pageId } = this.props;

    return <div className="comp-hero">

      <div className="wrapper">
        <div className="title is-1">
          <span className="icon is-large">
            <i className="fa fa-magic"></i>
          </span> 
          Team Profile Page Generator
        </div>
        <div className="subtitle is-4">
          Generate your team profile page easy
        </div>

        <div className="columns first">
          <div className="column is-12">
            <a href="#" className="button is-primary is-large">Generate</a>
          </div>
        </div>

        <div className="columns">
          <div className="column is-12">
            <div className="title is-3">
              OR
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-12">
            <p className="control has-addons has-addons-centered">
              <input onKeyPress={(e) => this.checkValidPageId(e)} 
                className="input is-medium " ref='pageIdInput' type="text" placeholder="Page ID">
              </input>
              <a className="button is-info is-medium is-disabled" onClick={(e) => this.redirectToProfilePage(e)}>Go</a>
            </p>
          </div>
        </div>

        <div className="copyright">
          Created by <strong>Noesis Mik</strong> | <a href="https://github.com/sharp7C0000" target="_blank"><i className="fa fa-github"></i> Github</a>
        </div>
      </div>

    </div>
  }
}

function select(state) {
  return {
    pageId: state.pageId
  };
}

export default connect(select)(Hero);