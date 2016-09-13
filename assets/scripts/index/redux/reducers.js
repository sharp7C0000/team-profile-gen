import { combineReducers } from 'redux';
import { TYPING_PAGE_ID }  from './actions';

function pageId(state = null, action) {
  switch (action.type) {
    case TYPING_PAGE_ID:
      return action.value;
    default:
      return state;
  }
}

const herosApp = combineReducers({
  pageId
});

export default herosApp;