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
      isEditing: false
    }
  }

  enterEdit() {
    this.setState({isEditing: true});
  }

  exitEdit(applyEdit = false) {
    this.setState({isEditing: false});
    if(applyEdit) {
      const { dispatch } = this.props;
      
      const nameNode     = ReactDOM.findDOMNode(this.refs.nameInput);
      const nameText     = nameNode.value.trim();
      const positionNode = ReactDOM.findDOMNode(this.refs.positionInput);
      const positionText = positionNode.value.trim();
      const descNode     = ReactDOM.findDOMNode(this.refs.descInput);
      const descText     = descNode.value;

      console.log(descText);

      this.props.onApplyEdit({
        name    : nameText,
        position: positionText,
        desc    : descText
      });
    }
  }

  confirmRemove() {
    this.refs.confRemove.show();
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
          {
            /** Name **/
            (() => {
              if(this.state.isEditing) {
                return <p className="control">
                  <input className="input is-medium" type="text" ref='nameInput'
                    defaultValue={this.props.name} 
                    placeholder="Name"
                  />
                </p>
              } else {
                return <div className={"title is-4 " + (this.props.name ? "" : "placeholder")} style={{height:"40px", lineHeight: "40px"}}>
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
              }
            })()
          }

          {
            /** Position **/
            (() => {
              if(this.state.isEditing) {
                return <p className="control">
                  <input className="input" type="text" ref='positionInput'
                    defaultValue={this.props.position} 
                    placeholder="Position"
                  />
                </p>
              } else {
                return <div className={"subtitle is-5 " + (this.props.position ? "" : "placeholder")}>
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
              }
            })()
          }

          {
            /** Description **/
            (() => {
              if(this.state.isEditing) {
                return <p className="control">
                    <textarea ref="descInput" defaultValue={this.props.desc}  className="textarea" placeholder="Description">
                    </textarea>
                  </p>
              } else {
                return <p className={(this.props.desc ? "" : "placeholder")} style={{whiteSpace: "pre-wrap"}}>
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
              }
            })()
          }

        </div>
      </div>

      <div className="media-right">
        {(() => {
          if(this.state.isEditing) {
            {/** edit mode **/}
            return <span>
              <a href="#" onClick={(e) => { e.preventDefault();this.exitEdit.bind(this, true)() }} className="button is-small is-primary is-outlined">
                <span className="icon is-small">
                  <i className="fa fa-check"></i>
                </span>
                <span>ok</span>
              </a>&nbsp;
              <button type="button" onClick={this.exitEdit.bind(this, false)} className="button is-small is-danger is-outlined">
                <span className="icon is-small">
                  <i className="fa fa-times"></i>
                </span>
                <span>cancel</span>
              </button>
            </span>
          } else {
            {/** not edit mode **/}
            return <span>
              <button type="button" onClick={this.enterEdit.bind(this)} className="button is-small is-success is-outlined">
                <span className="icon is-small">
                  <i className="fa fa-pencil"></i>
                </span>
                <span>edit</span>
              </button>&nbsp;
              <button type="button" onClick={(e) => this.confirmRemove(e)} className="button is-small is-danger is-outlined">
                <span className="icon is-small">
                  <i className="fa fa-trash"></i>
                </span>
                <span>remove</span>
              </button>
            </span>
          }
        })()}
      </div>

      {/* confirm modal */}
      <ConfirmModal ref="confRemove" okCallback={() => this.props.onClickRemove()}></ConfirmModal>

    </div>
  }
}

export default (Member);