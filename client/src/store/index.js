import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import chores from './chores'
import child from './child'
import familyId from './familyId'
import petSelector from './petSelector'

const reducer = combineReducers({user, chores, child, familyId, petSelector})
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
