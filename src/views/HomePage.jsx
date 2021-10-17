import { PAGE_LIMIT } from 'utilities/config'

import CountriesCard from 'components/CountriesCard'
import SearchBar from 'components/SearchBar'
import FilterDropdown from 'components/FilterDropdown'
import Button from 'components/Button'

const DUMMY_LIST = [...new Array(PAGE_LIMIT)]

const HomePage = ({
  filteredCountries,
  error,
  loading,
  searchTerm,
  setSearchTerm,
  regions,
  filterTerm,
  setFilterTerm,
  limit,
  handleShowMore
}) => {
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
        {loading ? (
          DUMMY_LIST.map((item, index) => <CountriesCard key={index} data={item} loading />)
        ) : error ? (
          <h1>{`There's an error: ${error}`}</h1>
        ) : (
          filteredCountries &&
          filteredCountries
            .slice(0, limit)
            .map(country => <CountriesCard key={country.alpha2Code} data={country} />)
        )}
      </div>
      <div className='home__footer'>
        {limit < filteredCountries?.length && <Button label='Show more' onClick={handleShowMore} />}
      </div>
    </div>
  )
}

export default HomePage
