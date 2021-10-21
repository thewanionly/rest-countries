import { API_ENDPOINT, FIELDS_STRING } from 'utilities/config'
import { useLoadData } from 'utilities/hooks'

// Gets resource endpoints given the resource and id
const getResourceEndpoints = (resource, id) => {
  const resourceEndpoints = {
    countries: `${API_ENDPOINT}/all?fields=${FIELDS_STRING}`,
    country_detail: `${API_ENDPOINT}/alpha/`,
    regions: `${API_ENDPOINT}/all?fields=region`
  }
  const endpoint = resourceEndpoints[resource]

  return endpoint && id ? `${endpoint}${id}` : endpoint
}

// Post process the results given the resource
const postProcessData = (data, resource) => {
  let postProcessedData = data

  if (resource === 'regions') {
    postProcessedData = [...new Set(data.map(d => d.region)), 'Show all']
  }

  return postProcessedData
}

/**
 * Uses useLoadData to fetch data depending on the resource or id.
 * Also handles post processing of data.
 */
const useData = (resource, id) => {
  const resourceEndpint = getResourceEndpoints(resource, id)

  const [data, isLoading, error] = useLoadData(resourceEndpint)

  const finalData = data && resource && postProcessData(data, resource)

  return [finalData, isLoading, error]
}

export default useData
