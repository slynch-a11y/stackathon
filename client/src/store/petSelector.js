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
const UPDATE_PET = 'UPDATE_PET'

export const setPets = pets => ({type: SET_PETS, pets})
export const addPet = pet => ({type: ADD_PET, pet})
export const updatePet = pet => ({type: UPDATE_PET, pet})

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

export const getInitialSinglePet = (petId) => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/pets/${petId}`);
      const pet = response.data;

      const action = addPet(pet);
      dispatch(action);
    }
    catch (error){
      console.log(error)
    }
  }
}

export const editPet = (pet, petId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/pets/${petId}`, pet)
      const action = updatePet(data)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
  }


export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PETS:
      return { ...state, pets: action.pets }
      case ADD_PET:
      return { ...state, singlePet: action.pet }
      case UPDATE_PET:
      return { ...state, pets: [...state.pets].map(pet => {
        if (pet.id === action.pet.id) return action.pet
        else return pet
      }) }
    default:
      return state
  }
}
