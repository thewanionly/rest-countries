import {
  FETCH_REGIONS_LOADING,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_ERROR
} from 'store/actions/types.js'

const INITIAL_STATE = {
  data: undefined,
  isLoading: false,
  error: false
}

// Post process the raw regions data
const postProcessRegions = data => {
  let postProcessedData = data

  //Remove duplicates. Map each item to an object with `label` and `value` keys
  postProcessedData = [...new Set(data.map(d => d.region))].map(d => ({
    label: d,
    value: d
  }))

  // Add one item to the data
  postProcessedData = [
    ...postProcessedData,
    {
      label: 'Show all',
      value: ''
    }
  ]

  return postProcessedData
}

const regions = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  let newState = state

  switch (type) {
    case FETCH_REGIONS_LOADING:
      newState = {
        data: undefined,
        isLoading: true,
        error: false
      }
      break
    case FETCH_REGIONS_SUCCESS:
      newState = {
        data: postProcessRegions(payload),
        isLoading: false,
        error: false
      }
      break
    case FETCH_REGIONS_ERROR:
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

export default regions
