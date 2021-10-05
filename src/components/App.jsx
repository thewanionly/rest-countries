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
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // fetch countries
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const data = await fetchFromUrl(`${API_ENDPOINT}/all`)

        setCountries(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  console.log('App countries', countries)
  console.log('App countries is array', Array.isArray(countries))

  console.log('App error', error)

  console.log('App loading', loading)

  return (
    <div>
      {countries ? (
        <>
          <h2>List of Countries</h2>
          <ul>
            {countries.map(country => (
              <CountriesCard key={country.alpha2Code} data={country} />
            ))}
          </ul>
        </>
      ) : error ? (
        <h1>{`There's an error: ${error}`}</h1>
      ) : (
        loading && <h1>Loading...</h1>
      )}
    </div>
  )
}

const CountriesCard = ({ data }) => {
  return (
    <li>
      <span>{data.name}</span>
    </li>
  )
}

export default App
