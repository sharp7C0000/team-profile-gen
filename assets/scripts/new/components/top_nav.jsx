import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

require("../../../scss/new/top_nav.scss");

class TopNav extends React.Component {

  render() {
    return  <div className="comp-top-nav">

      <div className="hero is-primary is-medium">
        <div className="hero-head">
           <div className="nav">
              <div className="container">
                <div className="nav-left">
                  <div className="nav-item">
                    <div className="title is-4">
                      <span className="icon">
                        <i className="fa fa-magic"></i>
                      </span>&nbsp;New Page
                    </div>
                  </div>
                </div>

                <div className="nav-right nav-menu">
                  <a href="/" className="nav-item">
                    <span className="icon is-small">
                      <i className="fa fa-home"></i>
                    </span>
                    &nbsp;Home
                  </a>
                  {/* TODO */}
                  <a href="#" className="nav-item">
                    <span className="icon is-small">
                      <i className="fa fa-question"></i>
                    </span>
                    &nbsp;Help
                  </a>
                </div>

              </div>
           </div>
        </div>
      </div>
    </div>
  }
}


export default (TopNav);