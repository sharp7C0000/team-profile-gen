import { combineReducers } from 'redux';
import { TYPING_PAGE_ID }  from './actions';

function pageId(state = { dirty: false }, action) {

  const defaultReturnState = {
    value: action.value
  }

  switch (action.type) {
    case TYPING_PAGE_ID:

      switch (action.value.length) {
        case 0:
          return Object.assign({}, defaultReturnState, {
            error: null,
            dirty: false
          });
        case 8:
          return Object.assign({}, defaultReturnState, {
            error: null,
            dirty: true
          });
        
        default:
          return Object.assign({}, defaultReturnState, {
            error: "Invalid Page ID",
            dirty: true
          });
      }
      
    default:
      return state;
  }
}

const herosApp = combineReducers({
  pageId
});

export default herosApp;