import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Contents extends React.Component {

  render() {
    return  <div className="comp-contents" style={{marginTop: 20}}>

      <div className="container">

      <div className="tile is-ancestor">
        <div className="tile is-4 is-vertical is-parent">
          <div className="tile is-child">
            <div className="panel">
              <p className="panel-heading">
                Control panel
              </p>

              <a className="panel-block" href="#">
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
                        <i className="fa fa-meh-o"></i>
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

              <div className="panel-block">
                 <ul className="menu-list">
                    <li>Team</li>
                    <li>Age</li>
                    <li>Height</li>
                  </ul>
              </div>

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
        </div>
        <div className="tile is-parent">
          <div className="tile is-child box">
            
            

            <div className="level">

              <div className="level-left">
                <div className="level-item">
                  <p className="title">test</p>
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

            <div className="media">
              <div className="media-left">
                <p className="image is-128x128">
                  <img src="http://placehold.it/128x128"/>
                </p>
              </div>
              <div className="media-content">
                <div className="content">
                  <div className="title is-4">dd</div>
                  <div className="subtitle is-5">Assistant manager</div>
                  <p>
                    Have a nice day all of you (Heart)
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

            <div className="media">
              <div className="media-left">
                <p className="image is-128x128">
                  <img src="http://placehold.it/128x128"/>
                </p>
              </div>
              <div className="media-content">
                <div className="content">
                  <div className="title is-4">aa</div>
                  <div className="subtitle is-5">Deputy manager</div>
                  <p>
                   ...
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

            <div className="media">
              <div className="media-left">
                <p className="image is-128x128">
                  <img src="http://placehold.it/128x128"/>
                </p>
              </div>
              <div className="media-content">
                <div className="content">
                  <div className="title is-4">gg</div>
                  <div className="subtitle is-5">Team manager</div>

                  <p>
                    Maybe i can help you :)
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