import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { typingPageID } from '../redux/actions';

require("../../../scss/index/hero.scss");

const VIEW_URL = (pageId) => { return "view/" + pageId };
const NEW_URL  = (pageId) => { return "new/" };

class Hero extends React.Component {

  redirectToProfilePage (e) {
    if(!this.props.pageId.error && this.props.pageId.dirty) {
      window.location = VIEW_URL(this.props.pageId.value);
    }
  }

  typingPageID (e) {
    if(e.key == "Enter") {
      this.redirectToProfilePage(e);
    } else {
      const { dispatch } = this.props;
      const node = ReactDOM.findDOMNode(this.refs.pageIdInput);
      const text = node.value.trim();
      dispatch(typingPageID(text));
    }
  }

  render() {

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
            <a href={NEW_URL()} className="button is-primary is-large">Generate</a>
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
              <input onKeyUp={(e) => this.typingPageID(e)}
                className={"input is-medium " + (this.props.pageId.error ? 'is-danger' : '')} ref='pageIdInput' type="text" placeholder="Page ID (ex: ByZywUza)">
              </input>
              <a className={"button is-info is-medium " + (this.props.pageId.error || !this.props.pageId.dirty ? 'is-disabled' : '')} onClick={(e) => this.redirectToProfilePage(e)}>Go</a>
            </p>

            {(() => {
              if(this.props.pageId.error) {
                return <span className="help is-danger">
                  <i className="fa fa-warning"></i> {this.props.pageId.error}
                </span>
              }
            })()}

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