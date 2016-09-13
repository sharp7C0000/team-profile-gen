import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

import Store from "./redux/store.js";

import Hero from './components/hero.jsx';

require("../../scss/application.scss");

ReactDOM.render(
  <Provider store={Store}>
    <Hero></Hero>
  </Provider>,
  document.querySelector('#app')
);