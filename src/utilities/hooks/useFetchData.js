import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  API_ENDPOINT,
  FIELDS_STRING,
  RESOURCE_COUNTRIES,
  RESOURCE_COUNTRY_DETAIL,
  RESOURCE_REGIONS
} from 'utilities/config'
import { fetchData } from 'store/actions'

// Resource endpoints
const RESOURCE_ENDPOINTS = {
  [RESOURCE_COUNTRIES]: `${API_ENDPOINT}/all?fields=${FIELDS_STRING}`,
  [RESOURCE_COUNTRY_DETAIL]: `${API_ENDPOINT}/alpha/`,
  [RESOURCE_REGIONS]: `${API_ENDPOINT}/all?fields=region`
}

// Gets resource endpoints given the resource and id
const getResourceEndpoints = (resource, id) => {
  const endpoint = RESOURCE_ENDPOINTS[resource]

  return endpoint && id ? `${endpoint}${id}` : endpoint
}

/**
 * Uses useDispatch to fetch data depending on the resource and/or id.
 * Uses useSelector to get the data specified by the resoure from the store and returns it.
 */
const useFetchData = (resource, id) => {
  const dispatch = useDispatch()
  const data = useSelector(({ [resource]: { data, isLoading, error } = {} }) => [
    data,
    isLoading,
    error
  ])

  // Dispatch fetchData on mount or if the dependencies have changed
  useEffect(() => {
    const resourceEndpoint = getResourceEndpoints(resource, id)

    dispatch(fetchData(resource, resourceEndpoint))
  }, [dispatch, resource, id])

  return data
}

export default useFetchData
