const initialState = {
  childAdded: {}
}

export const ADD_TOAST = 'ADD_TOAST'
export const REMOVE_TOAST = 'REMOVE_TOAST'

export function addToast(toast) {
  return {
    type: ADD_TOAST,
    cartToast: toast
  }
}

export function removeToast() {
  return {
    type: REMOVE_TOAST,
    cartToast: {}
  }
}

export default function(state = initialState, action) {
  switch (action.type) {

    case ADD_TOAST:
      return {...state, childAdded: action.cartToast}
    case REMOVE_TOAST:
      return {...state, childAdded: action.cartToast}
    default:
      return state
  }
}
