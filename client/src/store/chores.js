import axios from 'axios'

const initialState = {
  chores: []
}

/**
 * ACTION TYPES
 */
const SET_CHORES = 'SET_CHORES'
const ADD_CHORE = 'ADD_CHORE'
const EDIT_CHORE = 'EDIT_CHORE'
const DELETE_CHORE = 'DELETE_CHORE'

export const setChores = chores => ({type: SET_CHORES, chores})

export const addChore = chore => ({type: ADD_CHORE, chore})

export const editChore = chore => ({type: EDIT_CHORE, chore})

export const deleteChore = chore => ({
  type: DELETE_CHORE,
  choreId: chore.id
})

/**
 * THUNK CREATORS
 */
export const getChores = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/chores');
      const chores = response.data;
      console.log("GOTMYCHORES", chores)
      const action = setChores(chores);
      dispatch(action);
    }
    catch (error){
      console.log(error)
    }
  };
};

export const createChore = (chore, history) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/chores', chore)
      const action = addChore(data)
      dispatch(action)
      // history.push(`/chores/${data.id}`)
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateChore = (chore, choreId, history) => {
return async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/chores/${choreId}`, chore)
    const action = editChore(data)
    dispatch(action)
    // history.push(`/chores/${choreId}`)
  } catch (err) {
    console.log(err)
  }
}
}

export const removeChore = (choreId, history) => {
return async (dispatch) => {
  try {
    const {data} = await axios.delete(`/api/chores/${choreId}`, choreId)
    const action = deleteChore(data)
    dispatch(action)
    // history.push('/chores')
  } catch (err) {
    console.log(err)
  }
}
}





export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CHORES:
      return { ...state, chores: action.chores }
      case ADD_CHORE:
      return { ...state, chores: [...state.chores, action.chore] }
    case EDIT_CHORE:
      return { ...state, chores: [...state.chores].map(chore => {
        if (chore.id === action.chore.id) return action.chore
        else return chore
      }) }
    case DELETE_CHORE:
      return { ...state, chores: state.chores.filter(chore => chore.id !== action.choreId) }
    default:
      return state
  }
}
