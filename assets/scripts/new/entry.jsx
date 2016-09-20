import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

import Store from "./redux/store.js";

import TopNav      from './components/top_nav.jsx';
import Contents    from './components/contents.jsx';

require("../../scss/application.scss");

ReactDOM.render(
    <div>
      <TopNav></TopNav>
      <Provider store={Store}>
        <Contents></Contents>
      </Provider>
    </div>,
  document.querySelector('#app')
);