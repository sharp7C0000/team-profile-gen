import request from 'superagent';

export const UPDATE_TITLE  = 'UPDATE_TITLE';
export const ADD_MEMBER    = 'ADD_MEMBER';
export const REMOVE_MEMBER = 'REMOVE_MEMBER';
export const UPDATE_MEMBER = 'UPDATE_MEMBER';
export const RESET         = "RESET";

export const REQUEST_SAVE      = 'REQUEST_SAVE';
export const REQUEST_SAVE_FAIL = "REQUEST_SAVE_FAIL"
export const RECEIVE_SAVE      = 'RECEIVE_SAVE';

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

export function resetPage(deep = false) {
  return { type: RESET, deep }
}

function requestSave() {
  return { type: REQUEST_SAVE }
}

function requestSaveFail(err) {
  return { type: REQUEST_SAVE_FAIL, err }
}

function receiveSave(pageId) {
  return { type: RECEIVE_SAVE, pageId }
}

export function savePage(formData) {
  return function (dispatch) {

    dispatch(requestSave());

    // TODO : change promise
    return request
      .post('/new/')
      .send(formData)
      .end((err, res) => {
        if(err) {
          if(res && res.body && res.body.message) {
            dispatch(requestSaveFail(res.body.message))
          } else {
            dispatch(requestSaveFail(["Server Error"]))
          }
        } else {
          dispatch(receiveSave(res.body.data.url))
        }
      });
  }
}