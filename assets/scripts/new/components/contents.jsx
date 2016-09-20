import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import ControlPane from './contents/control_pane.jsx';
import Member      from './contents/member.jsx';

require("../../../scss/new/contents.scss");

class Contents extends React.Component {

  render() {
    
    return  <div className="comp-contents">

      <div className="container">
        
        <div className="tile is-ancestor">
          
          {/* Sidebar */}
          <div className="tile is-4 is-vertical is-parent">
            <div className="tile is-child">
              <ControlPane></ControlPane>
            </div>
          </div>

          {/* Preview */}
          <div className="tile is-parent">
            <div className="tile is-child box">
              <div className="level">

                <div className="level-left">
                  <div className="level-item">
                    <p className="title">a</p>
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

              <Member 
                name="hh"
                position="Assistant Manager"
                desc="Have a nice day all of you (Heart)"
              ></Member>

              <Member 
                name="dd"
                position="Deputy Team Manager"
                desc="..."
              ></Member>

              <Member 
                name="tt"
                position="Team manager"
                desc="Maybe i can help you :)"
              ></Member>

          </div>
        </div>
      </div>






      {/* controles sidebar */}


      {/* preview */}

      </div>

    </div>
  }
}


export default (Contents);