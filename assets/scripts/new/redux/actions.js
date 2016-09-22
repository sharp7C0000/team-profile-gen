export const UPDATE_TITLE  = 'UPDATE_TITLE';
export const ADD_MEMBER    = 'ADD_MEMBER';
export const REMOVE_MEMBER = 'REMOVE_MEMBER';
export const UPDATE_MEMBER = 'UPDATE_MEMBER';

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