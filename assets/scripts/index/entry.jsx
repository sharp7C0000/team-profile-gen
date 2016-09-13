import React      from 'react';
import ReactDOM   from 'react-dom';

import Hero from './components/hero.jsx';

require("../../scss/application.scss");

ReactDOM.render(
  <Hero></Hero>,
  document.querySelector('#app')
);