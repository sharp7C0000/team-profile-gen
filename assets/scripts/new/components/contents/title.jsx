import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Title extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      value    : null,
      tempValue: null
    };
  }

  changeTempValue (e) {
    this.setState({tempValue: e.target.value});
  }

  enterEdit() {
    this.setState({isEditing: true});
  }

  exitEdit(applyEdit = false) {
    this.setState({isEditing: false});
    if(applyEdit) {
      this.setState({value: this.state.tempValue});
    }
  }

  render() {
    return  <div className="comp-title level">
      <div className="level-left">
        <div className="level-item">

          {(() => {
            if(this.state.isEditing) {
              return <p className="control is-expanded">
                <input className="input is-large" type="text" 
                  onChange={this.changeTempValue.bind(this)} 
                  defaultValue={this.state.value} 
                  placeholder="Team Name"
                />
              </p>
            } else {
              return <p className={"title is-3 " + (!this.state.value ? 'placeholder' : '')} style={{height:"48px", lineHeight: "48px"}}>
                {(() => {
                  if(this.state.value) {
                    return this.state.value
                  } else {
                    return "Team Name"
                  }
                })()}
              </p>
            }
          })()}

        </div>
      </div>

      <div className="level-right">
        <div className="level-item">
          {(() => {
            if(this.state.isEditing) {
              {/** edit mode **/}
              return <span>
                <button type="button" onClick={this.exitEdit.bind(this, true)} className="button is-small is-primary is-outlined">
                  <span className="icon is-small">
                    <i className="fa fa-check"></i>
                  </span>
                  <span>ok</span>
                </button>&nbsp;
                <button type="button" onClick={this.exitEdit.bind(this)} className="button is-small is-danger is-outlined">
                  <span className="icon is-small">
                    <i className="fa fa-times"></i>
                  </span>
                  <span>cancel</span>
                </button>
              </span>
            } else {
              {/** not edit mode **/}
              return <button type="button" onClick={this.enterEdit.bind(this)} className="button is-small is-success is-outlined">
                <span className="icon is-small">
                  <i className="fa fa-pencil"></i>
                </span>
                <span>edit</span>
              </button>
            }
          })()}
        </div>
      </div>
    </div>
  }
}

export default (Title);

              