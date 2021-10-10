import CountriesCard from 'components/CountriesCard'
import SearchBar from 'components/SearchBar'
import FilterDropdown from 'components/FilterDropdown'

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
          filteredCountries.map(country => (
            <CountriesCard key={country.alpha2Code} data={country} />
          ))
        ) : error ? (
          <h1>{`There's an error: ${error}`}</h1>
        ) : (
          loading && <h1>Loading...</h1>
        )}
      </div>
    </div>
  )
}

export default HomePage
