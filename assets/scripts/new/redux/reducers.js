/*
{
  title  : null, // title of page
  members: []    // member list
}
*/

import { combineReducers } from 'redux';
import { UPDATE_TITLE, ADD_MEMBER }  from './actions';

function title(state = null, action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return action.value
    default:
      return state;
  }
}

function members(state = [], action) {
  switch (action.type) {
    case ADD_MEMBER:
      return [...state, {
        name     : null,
        position : null,
        desc     : null
      }];
    default:
      return state;
  }
}

const newApp = combineReducers({
  title,
  members
});

export default newApp;