import {
  FETCH_COUNTRY_DETAIL_LOADING,
  FETCH_COUNTRY_DETAIL_SUCCESS,
  FETCH_COUNTRY_DETAIL_ERROR
} from 'store/actions/types.js'

const INITIAL_STATE = {
  data: undefined,
  isLoading: false,
  error: false
}

const countryDetail = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  let newState = state

  switch (type) {
    case FETCH_COUNTRY_DETAIL_LOADING:
      newState = {
        data: undefined,
        isLoading: true,
        error: false
      }
      break
    case FETCH_COUNTRY_DETAIL_SUCCESS:
      newState = {
        data: payload,
        isLoading: false,
        error: false
      }
      break
    case FETCH_COUNTRY_DETAIL_ERROR:
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

export default countryDetail
