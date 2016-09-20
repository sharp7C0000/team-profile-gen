/*
{
  title  : null, // title of page
  members: []    // member list
}
*/

import { combineReducers } from 'redux';
import { UPDATE_TITLE }  from './actions';

function title(state = null, action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return action.value
    default:
      return state;
  }
}

const newApp = combineReducers({
  title
});

export default newApp;