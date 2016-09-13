import React from 'react';

require("../../../scss/index/hero.scss");

class Hero extends React.Component {
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
              <input className="input is-medium " type="text" placeholder="Page ID"></input>
              <a className="button is-info is-medium">Go</a>
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

export default Hero;