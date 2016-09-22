import request from 'superagent';

export const UPDATE_TITLE  = 'UPDATE_TITLE';
export const ADD_MEMBER    = 'ADD_MEMBER';
export const REMOVE_MEMBER = 'REMOVE_MEMBER';
export const UPDATE_MEMBER = 'UPDATE_MEMBER';
export const REQUEST_SAVE  = 'REQUEST_SAVE';
export const RECEIVE_SAVE  = 'RECEIVE_SAVE';

export function updateTitle(value) {
  return { type: UPDATE_TITLE, value }
}

export function addMember() {
  return { type: ADD_MEMBER }
}

export function removeMember(index) {
  return { type: REMOVE_MEMBER, index }
}

export function updateMember(index, values) {
  return { type: UPDATE_MEMBER, index, values }
}

function requestSave() {
  return { type: REQUEST_SAVE }
}

function receiveSave() {
  return { type: RECEIVE_SAVE }
}

export function savePage(formData) {
  return function (dispatch) {

    dispatch(requestSave());

    return request
      .post('/api/save_test')
      .send(formData)
      .end((err, res) => {
        dispatch(receiveSave())
      });
  }
}