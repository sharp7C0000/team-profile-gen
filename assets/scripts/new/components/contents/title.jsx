import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Title extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  enterEdit() {
    this.setState({isEditing: true});
  }

  exitEdit(applyEdit = false) {
    this.setState({isEditing: false});
    if(applyEdit) {
      const { dispatch } = this.props;
      const node = ReactDOM.findDOMNode(this.refs.titleInput);
      const text = node.value.trim();
      this.props.onApplyEdit(text);
    }
  }

  render() {
    return  <div className="comp-title level">
      <div className="level-left">
        <div className="level-item">

          {(() => {
            if(this.state.isEditing) {
              return <p className="control is-expanded">
                <input className="input is-large" type="text" ref='titleInput'
                  defaultValue={this.props.value} 
                  placeholder="Team Name"
                />
              </p>
            } else {
              return <p className={"title is-3 " + (!this.props.value ? 'placeholder' : '')} style={{height:"48px", lineHeight: "48px"}}>
                {(() => {
                  if(this.props.value) {
                    return this.props.value
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
                <button type="button" onClick={this.exitEdit.bind(this, false)} className="button is-small is-danger is-outlined">
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

export default Title;
              