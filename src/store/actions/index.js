import { API_ENDPOINT, FIELDS_STRING } from 'utilities/config'
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
  FETCH_COUNTRY_DETAIL_ERROR
} from './types'

/******************* HELPER FUNCTIONS ***********************/
// Resource endpoints
const RESOURCE_ENDPOINTS = {
  countries: `${API_ENDPOINT}/all?fields=${FIELDS_STRING}`,
  country_detail: `${API_ENDPOINT}/alpha/`,
  regions: `${API_ENDPOINT}/all?fields=region`
}

// Gets resource endpoints given the resource and id
const getResourceEndpoints = (resource, id) => {
  const endpoint = RESOURCE_ENDPOINTS[resource]

  return endpoint && id ? `${endpoint}${id}` : endpoint
}

// Get action type based on resource
const getActionType = resource => {
  const ACTION_TYPES = {
    countries: {
      LOADING_TYPE: FETCH_COUNTRIES_LOADING,
      SUCCESS_TYPE: FETCH_COUNTRIES_SUCCESS,
      ERROR_TYPE: FETCH_COUNTRIES_ERROR
    },
    country_detail: {
      LOADING_TYPE: FETCH_COUNTRY_DETAIL_LOADING,
      SUCCESS_TYPE: FETCH_COUNTRY_DETAIL_SUCCESS,
      ERROR_TYPE: FETCH_COUNTRY_DETAIL_ERROR
    },
    regions: {
      LOADING_TYPE: FETCH_REGIONS_LOADING,
      SUCCESS_TYPE: FETCH_REGIONS_SUCCESS,
      ERROR_TYPE: FETCH_REGIONS_ERROR
    }
  }

  return ACTION_TYPES[resource]
}

/*********************  ACTION CREATORS **************************/
const fetchData = (resource, id) => async dispatch => {
  // Get action types
  const { LOADING_TYPE, SUCCESS_TYPE, ERROR_TYPE } = getActionType(resource)

  try {
    // Loading
    dispatch({ type: LOADING_TYPE })

    // Get data from API
    const data = await fetchFromUrl(getResourceEndpoints(resource, id))

    // Success
    dispatch({ type: SUCCESS_TYPE, payload: data })
  } catch (error) {
    //Error
    dispatch({ type: ERROR_TYPE, payload: error })
  }
}

export { fetchData }
