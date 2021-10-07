import { useState, useEffect } from 'react'

// config
const API_ENDPOINT = 'https://restcountries.com/v2'

// fetch from API
const fetchFromUrl = async url => {
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) throw new Error(`Error fetching (${response.status})`)

    return data
  } catch (error) {
    console.error('Error logged here: ', error)
    throw error
  }
}

const App = () => {
  const [countries, setCountries] = useState()
  const [regions, setRegions] = useState()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState()

  const filteredCountries = countries?.filter(
    ({ name, region }) =>
      name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) &&
      (!filterTerm || filterTerm === 'Show all' || region === filterTerm)
  )

  const handleSetColorMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const handleSearch = e => {
    setSearchTerm(e.target.value)
  }

  const handleFilterByRegion = e => {
    setFilterTerm(e.target.value)
  }

  const handleShowDetailPage = code => {
    setSelectedCountry(code)
  }

  useEffect(() => {
    // load countries
    const loadCountries = async () => {
      try {
        setLoading(true)
        // Get countries from localStorage
        let data = localStorage.getItem('countries')

        if (data) {
          // Parse data from localStorage to JS object
          data = JSON.parse(data)
        } else {
          // Get countries from API
          data = await fetchFromUrl(`${API_ENDPOINT}/all`)

          // Store data in localStorage
          localStorage.setItem('countries', JSON.stringify(data))
        }

        // Set countries
        setCountries(data)
        setLoading(false)

        // Set regions
        const allRegions = data?.reduce(
          (regions, country) => {
            if (!regions?.includes(country.region)) {
              return [...regions, country.region]
            } else {
              return regions
            }
          },
          ['Show all']
        )

        setRegions(allRegions)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    loadCountries()
  }, [])

  // log only if countries changed
  useEffect(() => {
    console.log('App countries', countries)

    console.log('App regions', regions)
  }, [countries, regions])

  // log only if filteredCountries changed
  useEffect(() => {
    console.log('App filteredCountries', filteredCountries)
  }, [filteredCountries])

  return (
    <div className={`app${isDarkMode ? ' dark-mode' : ''}`}>
      <header className='navbar'>
        <h1>Where in the world?</h1>
        <button onClick={handleSetColorMode}>Dark Mode</button>
      </header>
      <main className='main'>
        {!selectedCountry ? (
          <HomePage
            filteredCountries={filteredCountries}
            error={error}
            loading={loading}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            regions={regions}
            filterTerm={filterTerm}
            handleFilterByRegion={handleFilterByRegion}
            handleShowDetailPage={handleShowDetailPage}
          />
        ) : (
          <DetailPage
            selectedCountry={selectedCountry}
            handleShowDetailPage={handleShowDetailPage}
          />
        )}
      </main>
    </div>
  )
}

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

const CountriesCard = ({ data = {}, onClick: handleShowDetailPage }) => {
  const { alpha2Code, flag, name, population, region, capital } = data

  const handleCardClick = () => {
    handleShowDetailPage(alpha2Code)
  }

  return (
    <div className='countries-card' onClick={handleCardClick}>
      <div className='countries-card__flag'>
        <img className='countries-card__flag__img' src={flag} alt={name} />
      </div>
      <div className='countries-card__details'>
        <h3 className='countries-card__details__name'>{name}</h3>
        <div className='countries-card__details__population'>
          <strong>Population: </strong>
          {population}
        </div>
        <div className='countries-card__details__region'>
          <strong>Region: </strong>
          {region}
        </div>
        <div className='countries-card__details__capital'>
          <strong>Capital: </strong>
          {capital}
        </div>
      </div>
    </div>
  )
}

const DetailPage = ({ selectedCountry, handleShowDetailPage }) => {
  const handleBackClick = () => {
    handleShowDetailPage(undefined)
  }

  return (
    <div className='detail'>
      <div className='detail__header'>
        <button onClick={handleBackClick}>Back</button>
      </div>
      <div className='detail__content'>{selectedCountry}</div>
    </div>
  )
}

export default App
