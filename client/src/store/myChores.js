import axios from 'axios'

const initialState = {
  chores: []
}

/**
 * ACTION TYPES
 */
const SET_CHORES = 'SET_CHORES'
const EDIT_CHORE = 'EDIT_CHORE'

export const setChores = chores => ({type: SET_CHORES, chores})
export const editChore = chore => ({type: EDIT_CHORE, chore})



/**
 * THUNK CREATORS
 */
export const getChores = (userId) => {
  return async dispatch => {
    try {
      console.log("CHORE????")
      const response = await axios.get(`/api/chores/users/${userId}`);
      const chores = response.data;
      console.log("GOTMYYYYYCHORES", chores)
      const action = setChores(chores);
      dispatch(action);
    }
    catch (error){
      console.log(error)
    }
  };
};


export const updateChore = (userId, choreId, chore) => {
return async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/users/${userId}/chores/${choreId}`, chore)
    const action = editChore(data)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}
}


export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CHORES:
      return { ...state, chores: action.chores }
    case EDIT_CHORE:
      return { ...state, chores: [...state.chores].map(chore => {
        if (chore.id === action.chore.id) return action.chore
        else return chore
      }) }
    default:
      return state
  }
}
