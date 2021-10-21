import { useState, useEffect } from 'react'

import { API_ENDPOINT, FIELDS_STRING } from 'utilities/config'
import { useLoadData } from 'utilities/hooks'

const useCountriesData = (searchTerm, filterTerm, includeRegions = false) => {
  const [countries, isLoading, error] = useLoadData(`${API_ENDPOINT}/all?fields=${FIELDS_STRING}`)
  const [regions, setRegions] = useState()

  const filteredCountries = countries?.filter(
    ({ name, region }) =>
      (!searchTerm || name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) &&
      (!filterTerm || filterTerm === 'Show all' || region === filterTerm)
  )

  useEffect(() => {
    if (includeRegions && countries) {
      // Set regions
      const allRegions = countries.reduce((regions, country) => {
        if (!regions?.includes(country.region)) {
          return [...regions, country.region]
        } else {
          return regions
        }
      }, [])

      setRegions([...allRegions, 'Show all'])
    }
  }, [countries, includeRegions])

  return [
    includeRegions ? { countries: filteredCountries, regions } : filteredCountries,
    isLoading,
    error
  ]
}

export default useCountriesData
