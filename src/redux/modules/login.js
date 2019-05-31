import axios from 'axios'
import { makeUrl } from '../../services'

// action types
const LOGIN_BEGIN = 'login/LOGIN_BEGIN'
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS'
const LOGIN_FAILED = 'login/LOGIN_FAILED'

// initial state
const initialState = {
  loggedUser: null,
  error: null,
  loading: false
}

// reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loggedUser: null,
        error: null,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedUser: action.loggedUser,
        loading: false
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loggedUser: null,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

// action creators
export const loginBegin = () => ({
  type: LOGIN_BEGIN
})

export const loginSucceded = (user) => ({
  type: LOGIN_SUCCESS,
  loggedUser: user
})

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  error
})

// thunks
export const login = (username, password) => async (dispatch, getState) => {
  try {
    dispatch(loginBegin())

    const response = await axios.get(makeUrl(`users?username=${username}&password=${password}`))
    if (response.data.length === 0) {
      throw new Error('Incorrect username or password')
    }

    const loggedUser = response.data[0]
    loggedUser.loggedAt = new Date()
    dispatch(loginSucceded(loggedUser))
    return true
  } catch (error) {
    dispatch(loginFailed(error))
    return false
  }
}
