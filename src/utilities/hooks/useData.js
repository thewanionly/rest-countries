import { API_ENDPOINT, FIELDS_STRING } from 'utilities/config'
import { useLoadData } from 'utilities/hooks'

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

// Post process the results given the resource
const postProcessData = (data, resource) => {
  let postProcessedData = data

  if (resource === 'regions') {
    postProcessedData = [...new Set(data.map(d => d.region))].map(d => ({
      label: d,
      value: d
    }))
    postProcessedData = [
      ...postProcessedData,
      {
        label: 'Show all',
        value: ''
      }
    ]
  }

  return postProcessedData
}

/**
 * Uses useLoadData to fetch data depending on the resource or id.
 * Also handles post processing of data.
 */
const useData = (resource, id) => {
  const resourceEndpoint = getResourceEndpoints(resource, id)

  const [data, isLoading, error] = useLoadData(resourceEndpoint)

  const finalData = data && resource && postProcessData(data, resource)

  return [finalData, isLoading, error]
}

export default useData
