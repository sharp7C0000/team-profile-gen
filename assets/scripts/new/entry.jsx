import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

import Nav      from './components/nav.jsx';
import Contents from './components/contents.jsx';

require("../../scss/application.scss");

ReactDOM.render(
  <div>
    <Nav></Nav>
    <Contents></Contents>
  </div>,
  document.querySelector('#app')
);