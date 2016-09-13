import React from 'react';

require("../../../scss/index/topbar.scss");

class Topbar extends React.Component {
  render() {
    return <div className="top-bar">

      <div className="titles">
        <h1 className="title is-1">
          <span className="icon is-large">
  <i className="fa fa-magic"></i>
</span> Team Profile Page Generator
        </h1>
      <h2 className="subtitle is-4">Generate your team profile page easy</h2>


      <div className="columns">
        <div className="column is-12">
          <a className="button is-primary is-large">Generate</a>
        </div>


      </div>


        <div className="column is-12">
          <h1 className="title is-3">
            OR
          </h1>

          
        </div>

        <div className="column is-12">

          <p className="control has-addons has-addons-centered">
            <input className="input is-medium " type="text" placeholder="Page ID"></input>
            <a className="button is-info is-medium">
              Go
            </a>
          </p>

        
        </div>


          <div className="notification2">
    Made by <strong>Noesis Mik</strong> | <a href="#"><i className="fa fa-github"></i> Github</a>
  </div>



        
      </div>

      

    </div>
  }
}

export default Topbar;