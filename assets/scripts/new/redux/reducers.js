import { combineReducers } from 'redux';
import { UPDATE_TITLE, ADD_MEMBER, UPDATE_MEMBER, REMOVE_MEMBER, SAVE_PAGE }  from './actions';

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
    case REMOVE_MEMBER:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    case UPDATE_MEMBER:
      return [
        ...state.slice(0, action.index),
        action.values,
        ...state.slice(action.index + 1)
      ]
    default:
      return state;
  }
}


function page(state = {}, action) {

  switch (action.type) {
    
    case SAVE_PAGE:
      console.log(state);
      return {
        title : title(state.title, action),
        members: members(state.members, action)
      };
    
    default:
      return {
        title : title(state.title, action),
        members: members(state.members, action)
      };
  }
}


const newApp = combineReducers({
  page
});

export default newApp;