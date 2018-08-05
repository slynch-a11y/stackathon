import axios from 'axios'

const initialState = {
  pets: [],
  singlePet: {}
}

/**
 * ACTION TYPES
 */
const SET_PETS = 'SET_PETS'
const ADD_PET = 'ADD_PET'


export const setPets = pets => ({type: SET_PETS, pets})
export const addPet = pet => ({type: ADD_PET, pet})

export const getPets = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/pets`);
      const pets = response.data;

      const action = setPets(pets);
      dispatch(action);
    }
    catch (error){
      console.log(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PETS:
      return { ...state, pets: action.pets }
      case ADD_PET:
      return { ...state, singlePet: action.pet }
    default:
      return state
  }
}
