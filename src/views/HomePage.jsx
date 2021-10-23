import { useState } from 'react'

import { PAGE_LIMIT, RESOURCE_COUNTRIES, RESOURCE_REGIONS } from 'utilities/config'
import { useFetchData, useFilterData } from 'utilities/hooks'

import { Button, CountriesCard, SearchBar, Dropdown } from 'components/index'

const DUMMY_LIST = [...new Array(PAGE_LIMIT)]

const HomePage = () => {
  const [limit, setLimit] = useState(PAGE_LIMIT)

  const [countries, isLoadingCountries, errorCountries] = useFetchData(RESOURCE_COUNTRIES)
  const [regions, isLoadingRegions, errorRegions] = useFetchData(RESOURCE_REGIONS)
  const [filteredCountries, filters, setFilters] = useFilterData(countries, {
    searchField: 'name',
    filterField: 'region'
  })

  const { searchTerm, filterTerm } = filters
  const { setSearchTerm, setFilterTerm } = setFilters

  const loading = isLoadingCountries || isLoadingRegions
  const error = errorCountries || errorRegions
  const data = filteredCountries

  const handleShowMore = () => {
    setLimit(prevValue => prevValue + PAGE_LIMIT)
  }

  return (
    <div className='home'>
      <div className='home__header'>
        <SearchBar
          value={searchTerm}
          placeholder='Search for a country...'
          onChange={setSearchTerm}
        />
        <Dropdown
          value={filterTerm}
          placeholder='Filter by Region'
          onChange={setFilterTerm}
          options={regions}
        />
      </div>
      <div className='home__content'>
        {loading ? (
          DUMMY_LIST.map((item, index) => <CountriesCard key={index} data={item} loading />)
        ) : error ? (
          <h3 className='error-message'>{`There's an error: ${error}`}</h3>
        ) : data && data.length > 0 ? (
          data
            .slice(0, limit)
            .map(country => <CountriesCard key={country.alpha2Code} data={country} />)
        ) : (
          <h3 className='no-results-message'>No results found</h3>
        )}
      </div>
      <div className='home__footer'>
        {limit < data?.length && <Button label='Show more' onClick={handleShowMore} />}
      </div>
    </div>
  )
}

export default HomePage
