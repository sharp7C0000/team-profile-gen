import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import ConfirmModal from '../../../common/components/confirm_modal.jsx';

const ImagePlaceholderSize = 128;
const ImagePlaceholderUrl  = `http://placehold.it/${ImagePlaceholderSize}x${ImagePlaceholderSize}?text=photo`;

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
      const name         = nameNode.value.trim();

      const positionNode = ReactDOM.findDOMNode(this.refs.positionInput);
      const position     = positionNode.value.trim();

      const descNode     = ReactDOM.findDOMNode(this.refs.descInput);
      const desc         = descNode.value;

      const image = this.refs.imageView.src == ImagePlaceholderUrl ? null : this.refs.imageView.src;

      this.props.onApplyEdit({image, name, position, desc});
    }
  }

  confirmRemove() {
    this.refs.confRemove.show();
  }

  changeImageInput(e) {
    if(e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.refs.imageView.src = e.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  openImageInput() {
    this.refs.imageInput.click();
  }

  render() {
    return  <div className="comp-member media">
      <div className="media-left">
        <p className="image is-128x128">
          {
            (() => {
              if(this.state.isEditing) {
                return <span>
                  <img ref="imageView" src={this.props.image ? this.props.image : ImagePlaceholderUrl} style={{width:`${ImagePlaceholderSize}px`, height:`${ImagePlaceholderSize}px`}}/>
                  <button onClick={(e) => this.openImageInput(e)} className="button is-blocked" style={{width:`${ImagePlaceholderSize}px`, marginTop: "5px"}}>Choose Image</button>
                  <input onChange={(e) => this.changeImageInput(e)} ref="imageInput" style={{display:"none"}}  type="file" accept="image/*"/>
                </span>
              } else {
                return <img src={this.props.image ? this.props.image : ImagePlaceholderUrl} style={{width:`${ImagePlaceholderSize}px`, height:`${ImagePlaceholderSize}px`}}/>
              }
            })()
          }
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

      {/* confirm remove modal */}
      {/* TODO : use one global modal */}
      <ConfirmModal ref="confRemove" message="Want a remove this member?" okCallback={() => this.props.onClickRemove()}></ConfirmModal>

    </div>
  }
}

export default (Member);