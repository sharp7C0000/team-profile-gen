import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  show () {
    this.setState({isOpen: true});
  }

  dismiss (applyOk = false) {
    this.setState({isOpen: false});
    if(applyOk) {
      this.props.okCallback();
    }
  }

  render () {
    return <div className={"modal " + (this.state.isOpen ? "is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <section className="modal-card-body">
          Want a remove this member?
        </section>
        <footer className="modal-card-foot">
          <button onClick={this.dismiss.bind(this, true)} type="button" className="button is-primary">Yes</button>
          <button onClick={this.dismiss.bind(this, false)} type="button" className="button">No</button>
        </footer>
      </div>
    </div>
  }
}

class Member extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing         : false
    }
  }

  enterEdit() {
    this.setState({isEditing: true});
  }

  exitEdit(applyEdit = false) {
    this.setState({isEditing: false});
    // if(applyEdit) {
    //   const { dispatch } = this.props;
    //   const node = ReactDOM.findDOMNode(this.refs.titleInput);
    //   const text = node.value.trim();
    //   dispatch(updateTitle(text));
    // }
  }

  confirmRemove() {
    this.refs.confRemove.show();
  }

  remove() {
    
  }

  render() {
    return  <div className="comp-member media">
      <div className="media-left">
        <p className="image is-128x128">
          <img src="http://placehold.it/128x128?text=photo"/>
        </p>
      </div>

      <div className="media-content">
        <div className="content">
          <div className={"title is-4 " + (this.props.name ? "" : "placeholder")}>
            {
              (() => {
                if(this.props.name) {
                  return this.props.name
                } else {
                  return "Name"
                }
              })()
            }
          </div>
          <div className={"subtitle is-5 " + (this.props.position ? "" : "placeholder")}>
            {
              (() => {
                if(this.props.position) {
                  return this.props.position
                } else {
                  return "Position"
                }
              })()
            }
          </div>
          <p className={(this.props.desc ? "" : "placeholder")}>
            {
              (() => {
                if(this.props.desc) {
                  return this.props.desc
                } else {
                  return "Description"
                }
              })()
            }
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
        <button onClick={(e) => this.confirmRemove(e)} className="button is-small is-danger is-outlined">
          <span className="icon is-small">
            <i className="fa fa-trash"></i>
          </span>
          <span>remove</span>
        </button>
      </div>

      {/* confirm modal */}
      <ConfirmModal ref="confRemove" okCallback={() => this.remove()}></ConfirmModal>

    </div>
  }
}

export default (Member);