import { combineReducers } from 'redux';
import { 
  UPDATE_TITLE, 
  ADD_MEMBER, 
  UPDATE_MEMBER, 
  REMOVE_MEMBER, 
  RESET,
  REQUEST_SAVE,
  REQUEST_SAVE_FAIL,
  RECEIVE_SAVE
}  from './actions';

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


function page(state = {
  isSaving    : false,
  savingError : [],
  savingResult: null,
  title       : "",
  members     : []
}, action) {

  switch (action.type) {

    case REQUEST_SAVE:
      return Object.assign({}, state, {
        isSaving    : true,
        savingResult: null,
        savingError : []
      })

    case RECEIVE_SAVE:
      return Object.assign({}, state, {
        isSaving    : false,
        savingResult: action.pageId,
        savingError : []
      })

    case REQUEST_SAVE_FAIL:
      return Object.assign({}, state, {
        isSaving    : false,
        savingResult: null,
        savingError : [... action.err]
      })

    case RESET:

      if(action.deep) {
        return {
          isSaving    : false,
          savingError : [],
          savingResult: null,
          title       : "",
          members     : []
        }
      } else {
        return Object.assign({}, state, {
          isSaving    : false,
          savingResult: null,
          savingError : []
        })
      }

    default:
      return Object.assign({}, state, {
        title  : title(state.title, action),
        members: members(state.members, action)
      })
  }
}


const newApp = combineReducers({
  page
});

export default newApp;