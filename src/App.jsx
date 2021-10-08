import { useState, useEffect } from 'react'

import { API_ENDPOINT } from 'utilities/config'
import { useLoadData } from 'utilities/hooks'

import HomePage from 'views/HomePage.jsx'
import DetailPage from 'views/DetailPage.jsx'

const App = () => {
  const [countries, isLoading, error] = useLoadData(`${API_ENDPOINT}/all`)
  const [regions, setRegions] = useState()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

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

  // log only if countries changed
  useEffect(() => {
    console.log('App countries', countries)

    if (countries) {
      // Set regions
      const allRegions = countries.reduce(
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
    }
  }, [countries])

  // log only if regions changed
  useEffect(() => {
    console.log('App regions', regions)
  }, [regions])

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
            loading={isLoading}
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
