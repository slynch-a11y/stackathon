import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CHORES = 'SET_CHORES'

const initialState = {
  chores: []
}

export const setChores = chores => ({type: SET_CHORES, chores})

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

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CHORES:
      return { ...state, chores: action.chores }
    default:
      return state
  }
}
