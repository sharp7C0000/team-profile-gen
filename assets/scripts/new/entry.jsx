import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

import Nav from './components/nav.jsx';

require("../../scss/application.scss");

ReactDOM.render(
  <Nav></Nav>,
  document.querySelector('#app')
);