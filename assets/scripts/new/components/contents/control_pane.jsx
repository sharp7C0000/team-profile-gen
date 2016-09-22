import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { addMember, savePage } from '../../redux/actions';

class ControlPane extends React.Component {

  add (e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(addMember());
  }

  save (e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(savePage(this.props.serialized));
  }

  render() {
    return  <div className="comp-control-pane">
      
      <div className="panel">
        
        <p className="panel-heading">
          Control panel
        </p>

        <a className="panel-block" href="#" onClick={(e) => this.add(e)}>
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
                  <i className="fa fa-list-alt"></i>
                </span>
                Custom Fields
              </div>
            </div>

            <div className="level-right">
              <div className="level-item">
                <button className="button is-info is-outlined is-disabled is-small">
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

        {/*<div className="panel-block">
          <ul className="menu-list">
            <li>Team</li>
            <li>Age</li>
            <li>Height</li>
          </ul>
        </div>
       */}

        <div className="panel-block">
          <button onClick={(e) => this.save(e)} className="button is-primary is-fullwidth">
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
  }
}

function select(state) {

  function toBlob(dataURL) {
    if(dataURL) {
      var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    }
  }

  const fd = new FormData();

  fd.append("title", state.page.title);

  state.page.members.forEach((member, index) => {
    fd.append(`name[${index}]`, member.name);
    fd.append(`position[${index}]`, member.position);
    fd.append(`desc[${index}]`, member.desc);
    if(member.image) {
      fd.append(`image[${index}]`, toBlob(member.image), "ifile");
    }
  });

  return {
    serialized: fd
  };
}

export default connect(select)(ControlPane);