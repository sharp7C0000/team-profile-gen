import { combineReducers } from 'redux';

function title(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function members(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

function page(state = {
  title       : "",
  members     : []
}, action) {

  switch (action.type) {
    default:
      return Object.assign({}, state, {
        title  : title(state.title, action),
        members: members(state.members, action)
      })
  }
}

const viewApp = combineReducers({
  page
});

export default viewApp;