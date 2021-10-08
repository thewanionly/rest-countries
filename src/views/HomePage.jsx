import CountriesCard from 'components/CountriesCard'

const HomePage = ({
  filteredCountries,
  error,
  loading,
  searchTerm,
  handleSearch,
  regions,
  filterTerm,
  handleFilterByRegion,
  handleShowDetailPage
}) => {
  return (
    <div className='home'>
      <div className='home__header'>
        <input
          type='text'
          placeholder='Search for a country...'
          value={searchTerm}
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
            <CountriesCard key={country.alpha2Code} data={country} onClick={handleShowDetailPage} />
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
