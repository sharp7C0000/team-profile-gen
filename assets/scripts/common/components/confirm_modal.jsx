import React from 'react';

export default class ConfirmModal extends React.Component {

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
          {this.props.message}
        </section>
        <footer className="modal-card-foot">
          <button onClick={this.dismiss.bind(this, true)} type="button" className="button is-primary">Yes</button>
          <button onClick={this.dismiss.bind(this, false)} type="button" className="button">No</button>
        </footer>
      </div>
    </div>
  }
}