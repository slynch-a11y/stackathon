import axios from 'axios'

const initialState = {
  children: []
}

/**
 * ACTION TYPES
 */
const SET_CHILDREN = 'SET_CHILDREN'
const ADD_CHILD = 'ADD_CHILD'
const EDIT_CHILD = 'EDIT_CHILD'
const DELETE_CHILD = 'DELETE_CHILD'

export const setChildren = children => ({type: SET_CHILDREN, children})

export const addChild = child => ({type: ADD_CHILD, child})

export const editChild = child => ({type: EDIT_CHILD, child})

export const deleteChild = child => ({
  type: DELETE_CHILD,
  childId: child.id
})

/**
 * THUNK CREATORS
 */
export const getChildren = (familyId) => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/children/${familyId}`);
      const children = response.data;
      console.log("FAMILYID", familyId)
      console.log("GOTMYCHILDREN", children)
      const action = setChildren(children);
      dispatch(action);
    }
    catch (error){
      console.log(error)
    }
  };
};

export const createChild = (child) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/users', child)
      const action = addChild(data)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateChild = (child, childId, history) => {
return async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/children/${childId}`, child)
    const action = editChild(data)
    dispatch(action)
    history.push(`/children/${childId}`)
  } catch (err) {
    console.log(err)
  }
}
}

export const removeChild = (childId, history) => {
return async (dispatch) => {
  try {
    const {data} = await axios.delete(`/api/children/${childId}`, childId)
    const action = deleteChild(data)
    dispatch(action)
    history.push('/children')
  } catch (err) {
    console.log(err)
  }
}
}





export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CHILDREN:
      return { ...state, children: action.children }
      case ADD_CHILD:
      return { ...state, children: [...state.children, action.child] }
    case EDIT_CHILD:
      return { ...state, children: [...state.children].map(child => {
        if (child.id === action.child.id) return action.child
        else return child
      }) }
    case DELETE_CHILD:
      return { ...state, children: state.children.filter(child => child.id !== action.childId) }
    default:
      return state
  }
}
