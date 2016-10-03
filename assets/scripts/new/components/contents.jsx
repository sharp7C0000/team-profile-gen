import React from 'react';
import { connect } from 'react-redux';

import ControlPane  from './contents/control_pane.jsx';
import Preview      from './contents/preview.jsx';

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
              <Preview></Preview>
            </div>
          </div>
        </div>

      </div>

    </div>
  }
}

export default connect()(Contents);