import React from 'react';
import { connect } from 'react-redux';

import { dataURIToBlob } from "../../../common/util.js";

import ConfirmModal from '../../../common/components/confirm_modal.jsx';

require("../../../../scss/new/control_pane.scss");

import { addMember, savePage, resetPage } from '../../redux/actions';

class ProgressIndicator extends React.Component {
  render () {
    return <div className="comp-progress-indicator modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <span className="icon is-large">
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
        </span>
        <div className="title is-1">Save in progress</div>
      </div>
    </div>
  }
}

class SaveErrorModal extends React.Component {

  render () {
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Save fail</p>
        </header>
        <section className="modal-card-body">
          <ul>
            {
              (() => {
                return this.props.message.map((msg, index) => {
                  return <li key={index}>{msg}</li>
                });
              })()
            } 
          </ul>
        </section>
        <footer className="modal-card-foot">
          <button onClick={(e) => this.props.onDismiss(e)} type="button" className="button">Ok</button>
        </footer>
      </div>
    </div>
  }
}

class SaveSuccessModal extends React.Component {

  render () {
    return <div className="comp-save-success-modal modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Save success</p>
          </header>
          <section className="modal-card-body">
          
              <p className="title is-4">Page ID is</p>
              <div className="box">
                <p className="subtitle is-4">{this.props.pageInfo.id}</p>
              </div>
              Direct link : <a href={this.props.pageInfo.url}>
                {this.props.pageInfo.url}
              </a>

          </section>
            <footer className="modal-card-foot">
            <a href={this.props.pageInfo.url} className="button is-primary">View page</a>
            <button type="button" onClick={(e) => this.props.onDismiss(e)} className="button">Once again</button>
          </footer>
        </div>
      </div>
  }
}

class ControlPane extends React.Component {
  
  onClickSave (e) {
    e.preventDefault();
    this.refs.confSave.show();
  }

  render() {
    return  <div className="comp-control-pane">
      
      <div className="panel">
        
        <p className="panel-heading">
          Control panel
        </p>

        <a className="panel-block" href="#" onClick={(e) => { e.preventDefault(); this.props.onClickAdd() }}>
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
          <button onClick={(e) => this.onClickSave(e)} className="button is-primary is-fullwidth">
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
      <ConfirmModal ref="confSave" message="Really want a save this page?" okCallback={() => this.props.onConfirmSave(this.props.serialized)}></ConfirmModal>

      {
        (() => {
          if(this.props.isSaving) {
            return <ProgressIndicator></ProgressIndicator>
          } else {
            if(this.props.savingResult) {
              return <SaveSuccessModal pageInfo={this.props.savingResult} onDismiss={(e) => this.props.onDismissSaveSuccess(true)}></SaveSuccessModal>
            }
            if(this.props.savingError.length > 0) {
              return <SaveErrorModal message={this.props.savingError} onDismiss={(e) => this.props.onDismissSaveError(false)}></SaveErrorModal>
            }
          }
        })()
      }

    </div>
  }
}

const mapStateToProps = (state) => {
 
  return {
    isSaving    : state.page.isSaving,
    savingResult: state.page.savingResult,
    savingError : state.page.savingError,
    serialized  : (() => {
      const fd = new FormData();

      fd.append("title", state.page.title);

      state.page.members.forEach((member, index) => {
        fd.append(`member[${index}].name`, member.name);
        fd.append(`member[${index}].position`, member.position);
        fd.append(`member[${index}].desc`, member.desc);
        if(member.image) {
          fd.append(`member[${index}].image`, dataURIToBlob(member.image), "ifile");
        }
      });

      fd.append("totalMember", state.page.members.length);

      return fd;
    })()
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAdd () {
      dispatch(addMember());
    },

    onDismissSaveError () {
      dispatch(resetPage(false));
    },

    onDismissSaveSuccess () {
      dispatch(resetPage(true));
    },

    onConfirmSave (serialized) {
      dispatch(savePage(serialized));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPane);