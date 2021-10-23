import { RESOURCE_COUNTRIES, RESOURCE_COUNTRY_DETAIL, RESOURCE_REGIONS } from 'utilities/config'
import { fetchFromUrl } from 'utilities/helpers'

import {
  FETCH_COUNTRIES_LOADING,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_ERROR,
  FETCH_REGIONS_LOADING,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_ERROR,
  FETCH_COUNTRY_DETAIL_LOADING,
  FETCH_COUNTRY_DETAIL_SUCCESS,
  FETCH_COUNTRY_DETAIL_ERROR,
  SET_DARK_MODE,
  SET_SEARCH_TERM,
  SET_FILTER_TERM,
  SET_LIMIT
} from './types'

/******************* HELPER FUNCTIONS ***********************/
// Get action type based on resource
const getActionType = resource => {
  const ACTION_TYPES = {
    [RESOURCE_COUNTRIES]: {
      LOADING_TYPE: FETCH_COUNTRIES_LOADING,
      SUCCESS_TYPE: FETCH_COUNTRIES_SUCCESS,
      ERROR_TYPE: FETCH_COUNTRIES_ERROR
    },
    [RESOURCE_COUNTRY_DETAIL]: {
      LOADING_TYPE: FETCH_COUNTRY_DETAIL_LOADING,
      SUCCESS_TYPE: FETCH_COUNTRY_DETAIL_SUCCESS,
      ERROR_TYPE: FETCH_COUNTRY_DETAIL_ERROR
    },
    [RESOURCE_REGIONS]: {
      LOADING_TYPE: FETCH_REGIONS_LOADING,
      SUCCESS_TYPE: FETCH_REGIONS_SUCCESS,
      ERROR_TYPE: FETCH_REGIONS_ERROR
    }
  }

  return ACTION_TYPES[resource]
}

/*********************  ACTION CREATORS **************************/
/**
 * Fetching the data based on action
 */
const fetchData =
  (resource, url, cacheResults = true) =>
  async dispatch => {
    // Get action types
    const { LOADING_TYPE, SUCCESS_TYPE, ERROR_TYPE } = getActionType(resource)

    try {
      // Loading
      dispatch({ type: LOADING_TYPE })

      // Get data from localStorage
      let data = localStorage.getItem(url)

      if (data) {
        // Parse data from localStorage to JS object
        data = JSON.parse(data)
      } else {
        // Get data from API
        data = await fetchFromUrl(url)

        // Store data in localStorage
        cacheResults && localStorage.setItem(url, JSON.stringify(data))
      }

      // Success
      dispatch({ type: SUCCESS_TYPE, payload: data })
    } catch (error) {
      //Error
      dispatch({ type: ERROR_TYPE, payload: error })
    }
  }

/**
 * Setting darkMode
 */
const setDarkMode = value => ({
  type: SET_DARK_MODE,
  payload: value
})

/**
 * Setting searchTerm
 */
const setSearchTerm = value => ({
  type: SET_SEARCH_TERM,
  payload: value
})

/**
 * Setting filterTerm
 */
const setFilterTerm = value => ({
  type: SET_FILTER_TERM,
  payload: value
})

/**
 * Setting limit
 */
const setLimit = value => ({
  type: SET_LIMIT,
  payload: value
})

export { fetchData, setDarkMode, setSearchTerm, setFilterTerm, setLimit }
