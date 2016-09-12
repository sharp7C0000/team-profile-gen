import React from 'react';

class Hello extends React.Component {
  render() {
    return <div className="content">
      <h1>Hello from {this.props.phrase}!</h1>
      <div className="columns">
  <div className="column">
    First column
  </div>
  <div className="column">
    Second column
  </div>
  <div className="column">
    Third column
  </div>
  <div className="column">
    Fourth column
  </div>
</div>
    </div>  
    ;
  }
}

export default Hello;