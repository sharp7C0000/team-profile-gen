export const UPDATE_TITLE = 'UPDATE_TITLE';
export const ADD_MEMBER   = 'ADD_MEMBER';

export function updateTitle(value) {
  return { type: UPDATE_TITLE, value }
}

export function addMember() {
  return { type: ADD_MEMBER }
}