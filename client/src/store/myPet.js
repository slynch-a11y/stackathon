import axios from 'axios'

const initialState = {
  myPet: {}
}

/**
 * ACTION TYPES
 */
const ADD_PET = 'ADD_PET'

export const addPet = pet => ({type: ADD_PET, pet})


//get the single pet by userId
export const getSinglePet = (userId) => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/pets/users/${userId}`);
      const pet = response.data;

      const action = addPet(pet[0]);
      dispatch(action);
    }
    catch (error){
      console.log(error)
    }
  }
}




export default function(state = initialState, action) {
  switch (action.type) {

      case ADD_PET:
      return { ...state, myPet: action.pet }

    default:
      return state
  }
}
