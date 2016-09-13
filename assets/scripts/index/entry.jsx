import React      from 'react';
import ReactDOM   from 'react-dom';

import Topbar from './components/topbar.jsx';
import Hello  from './components/hello.jsx';

require("../../scss/application.scss");

ReactDOM.render(
  <div>
    <Topbar></Topbar>
  </div>,
  document.querySelector('#app')
);