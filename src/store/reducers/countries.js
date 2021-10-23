import {
  FETCH_COUNTRIES_LOADING,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_ERROR
} from 'store/actions/types.js'

const INITIAL_STATE = {
  data: undefined,
  isLoading: false,
  error: false
}

const countries = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  let newState = state

  switch (type) {
    case FETCH_COUNTRIES_LOADING:
      newState = {
        data: undefined,
        isLoading: true,
        error: false
      }
      break
    case FETCH_COUNTRIES_SUCCESS:
      newState = {
        data: payload,
        isLoading: false,
        error: false
      }
      break
    case FETCH_COUNTRIES_ERROR:
      newState = {
        data: undefined,
        isLoading: false,
        error: payload
      }
      break
    default:
      newState = state
  }

  return newState
}

export default countries
