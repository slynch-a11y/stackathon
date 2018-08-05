import axios from 'axios'

const initialState = {
  familyId: 0
}

/**
 * ACTION TYPES
 */
const SET_FAMILY_ID = 'SET_FAMILY_ID'

export const setFamilyId = id => ({type: SET_FAMILY_ID, id})


/**
 * THUNK CREATORS
 */
export const getFamilyId = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users');
      const users = response.data;
      let familyId = users.map(user => user.familyId)
      let sortedFamilyId = familyId.sort()
      let greatestId = sortedFamilyId[sortedFamilyId.length-1]
      const action = setFamilyId(greatestId);
      dispatch(action);
    }
    catch (error){
      console.log(error)
    }
  }
}

// export const editFamilyId = (user, userId) => {
//   return async (dispatch) => {
//     try {
//       //post user.familyId = state.familyId++
//       const {data} = await axios.put(`/api/users/${userId}`, user)
//       const action = updateFamilyId(data)
//       dispatch(action)
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   }


export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FAMILY_ID:
      return { ...state, familyId: action.id }
    default:
      return state
  }
}

