import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import ConfirmModal from '../../../common/components/confirm_modal.jsx';

import { addMember, savePage, resetPage } from '../../redux/actions';

class ProgressIndicator extends React.Component {
  render () {
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content" style={{textAlign:"center", color: "#fff", overflow: "visible"}}>
        <span className="icon is-large">
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
        </span>
        <div className="title is-1" style={{color: "#FFF"}}>Save in progress</div>
      </div>
    </div>
  }
}

class SaveSuccessModal extends React.Component {

  render () {
    return <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Save success</p>
          </header>
          <section className="modal-card-body" style={{textAlign: "center"}}>
          
              <p className="title is-4">Page ID is</p>
              <div className="box">
                <p className="subtitle is-4">{this.props.pageId}</p>
              </div>
              Direct link : <a href={"http://localhost:8989/view/" + this.props.pageId}>
                {"http://localhost:8989/view/" + this.props.pageId}
              </a>

          </section>
            <footer className="modal-card-foot">
            <a href={"http://localhost:8989/view/" + this.props.pageId} className="button is-primary">View page</a>
            <button type="button" onClick={(e) => this.props.onDismiss(e)} className="button">Once again</button>
          </footer>
        </div>
      </div>
  }
}

class ControlPane extends React.Component {

  add (e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(addMember());
  }

  save (e) {
    e.preventDefault();
    this.refs.confSave.show();
  }

  reset (e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(resetPage());
  }

  saveProcess () {
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

      {/* confirm save modal */}
      {/* TODO : use one global modal */}
      <ConfirmModal ref="confSave" message="Really want a save this page?" okCallback={() => this.saveProcess()}></ConfirmModal>

      {
        (() => {
          if(this.props.isSaving) {
            return <ProgressIndicator></ProgressIndicator>
          } else {
            if(this.props.savingResult) {
              return <SaveSuccessModal pageId={this.props.savingResult} onDismiss={(e) => this.reset(e)}></SaveSuccessModal>
            }
          }
        })()
      }

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
    fd.append(`member[${index}].name`, member.name);
    fd.append(`member[${index}].position`, member.position);
    fd.append(`member[${index}].desc`, member.desc);
    if(member.image) {
      fd.append(`member[${index}].image`, toBlob(member.image), "ifile");
    }
  });

  fd.append("totalMember", state.page.members.length);

  return {
    isSaving    : state.page.isSaving,
    savingResult: state.page.savingResult,
    serialized  : fd
  };
}

export default connect(select)(ControlPane);