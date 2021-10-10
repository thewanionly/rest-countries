import CountriesCard from 'components/CountriesCard'
import SearchBar from 'components/SearchBar'

const HomePage = ({
  filteredCountries,
  error,
  loading,
  searchTerm,
  handleSearch,
  regions,
  filterTerm,
  handleFilterByRegion
}) => {
  return (
    <div className='home'>
      <div className='home__header'>
        <SearchBar
          value={searchTerm}
          placeholder='Search for a country...'
          onChange={handleSearch}
        />
        <select value={filterTerm} onChange={handleFilterByRegion}>
          {regions?.map(region => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
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
