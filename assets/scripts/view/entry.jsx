import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import viewApp from './redux/reducers';
import thunkMiddleware from 'redux-thunk'

//import Store from "./redux/store.js";

import App      from './components/app.jsx';
//import Contents    from './components/contents.jsx';

require("../../scss/application.scss");

const preloadedState = global.__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(viewApp, preloadedState)

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.querySelector('#app')
)