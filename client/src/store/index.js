import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import chores from './chores'
import child from './child'
import familyId from './familyId'
import petSelector from './petSelector'
import myChores from './myChores'
import myPet from './myPet'
import toasts from './toasts'

const reducer = combineReducers({user, chores, child, familyId, petSelector, myChores, myPet, toasts})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './chores'
export * from './child'
export * from './familyId'
export * from './petSelector'
export * from './myChores'
export * from './myPet'
export * from './toasts'
