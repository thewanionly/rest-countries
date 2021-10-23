const API_ENDPOINT = 'https://restcountries.com/v2'
const USER_LOCALE = navigator.language
const TIMEOUT_SEC = 10
const PAGE_LIMIT = 8
const FIELDS_STRING = 'alpha2Code,alpha3Code,flag,name,population,region,capital'

//Resource types
const RESOURCE_COUNTRIES = 'countries'
const RESOURCE_COUNTRY_DETAIL = 'countryDetail'
const RESOURCE_REGIONS = 'regions'

export {
  API_ENDPOINT,
  USER_LOCALE,
  TIMEOUT_SEC,
  PAGE_LIMIT,
  FIELDS_STRING,
  RESOURCE_COUNTRIES,
  RESOURCE_COUNTRY_DETAIL,
  RESOURCE_REGIONS
}
