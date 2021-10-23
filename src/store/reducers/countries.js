import { PAGE_LIMIT } from 'utilities/config'

import {
  FETCH_COUNTRIES_LOADING,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_ERROR,
  SET_SEARCH_TERM,
  SET_FILTER_TERM,
  SET_LIMIT
} from 'store/actions/types.js'

const INITIAL_STATE = {
  data: null,
  searchTerm: '',
  filterTerm: '',
  limit: PAGE_LIMIT,
  isLoading: false,
  error: false
}

const countries = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  let newState = state

  switch (type) {
    case FETCH_COUNTRIES_LOADING:
      newState = {
        ...newState,
        data: undefined,
        isLoading: true,
        error: false
      }
      break
    case FETCH_COUNTRIES_SUCCESS:
      newState = {
        ...newState,
        data: payload,
        isLoading: false,
        error: false
      }
      break
    case FETCH_COUNTRIES_ERROR:
      newState = {
        ...newState,
        data: undefined,
        isLoading: false,
        error: payload
      }
      break
    case SET_SEARCH_TERM:
      newState = {
        ...newState,
        searchTerm: payload
      }
      break
    case SET_FILTER_TERM:
      newState = {
        ...newState,
        filterTerm: payload
      }
      break
    case SET_LIMIT:
      newState = {
        ...newState,
        limit: payload
      }
      break
    default:
      newState = state
  }

  return newState
}

export default countries
