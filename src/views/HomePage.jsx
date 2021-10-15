import { useState } from 'react'

import CountriesCard from 'components/CountriesCard'
import SearchBar from 'components/SearchBar'
import FilterDropdown from 'components/FilterDropdown'
import Button from 'components/Button'

const PAGE_LIMIT = 10

const HomePage = ({
  filteredCountries,
  error,
  loading,
  searchTerm,
  setSearchTerm,
  regions,
  filterTerm,
  setFilterTerm
}) => {
  const [limit, setLimit] = useState(PAGE_LIMIT)

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
        <FilterDropdown
          value={filterTerm}
          placeholder='Filter by Region'
          onChange={setFilterTerm}
          options={regions}
        />
      </div>
      <div className='home__content'>
        {filteredCountries ? (
          filteredCountries
            .slice(0, limit)
            .map(country => <CountriesCard key={country.alpha2Code} data={country} />)
        ) : error ? (
          <h1>{`There's an error: ${error}`}</h1>
        ) : (
          loading && <h1>Loading...</h1>
        )}
      </div>
      <div className='home__footer'>
        {limit < filteredCountries?.length && <Button label='Show more' onClick={handleShowMore} />}
      </div>
    </div>
  )
}

export default HomePage
