import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import cartReducer from '../modules/cart'
import loginReducer from '../modules/login'

const rootReducer = combineReducers({
  cart: cartReducer,
  login: loginReducer
})

export default createStore(rootReducer, {}, applyMiddleware(thunk))
