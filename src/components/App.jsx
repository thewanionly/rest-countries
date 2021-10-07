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
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const filteredCountries = countries?.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  )

  const handleSetColorMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const handleSearch = e => {
    setSearchTerm(e.target.value)
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
          console.log('data localStorage', data)
        } else {
          // Get countries from API
          data = await fetchFromUrl(`${API_ENDPOINT}/all`)

          // Store data in localStorage
          localStorage.setItem('countries', JSON.stringify(data))
          console.log('data API', data)
        }

        setCountries(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    loadCountries()
  }, [])

  console.log('App countries', countries)

  return (
    <div className={`app${isDarkMode ? ' dark-mode' : ''}`}>
      <header className='navbar'>
        <h1>Where in the world?</h1>
        <button onClick={handleSetColorMode}>Dark Mode</button>
      </header>
      <main className='main'>
        <div className='main__header'>
          <input
            type='text'
            placeholder='Search for a country...'
            value={searchTerm}
            onChange={handleSearch}
          />
          <select>
            <option value='africa'>Africa</option>
            <option value='america'>America</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='oceania'>Oceania</option>
          </select>
        </div>
        <div className='main__content'>
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
      </main>
    </div>
  )
}

const CountriesCard = ({ data = {} }) => {
  const { flag, name, population, region, capital } = data

  return (
    <div className='countries-card'>
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

export default App
