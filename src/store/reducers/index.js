import { combineReducers } from 'redux'

import countries from './countries.js'
import countryDetail from './countryDetail.js'
import regions from './regions.js'

export default combineReducers({
  countries,
  countryDetail,
  regions
})
