import { useState, useEffect } from 'react'

import { API_ENDPOINT } from 'utilities/config'
import { fetchFromUrl } from 'utilities/helpers'

import HomePage from 'views/HomePage.jsx'
import DetailPage from 'views/DetailPage.jsx'

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

export default App
