import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { API_ENDPOINT, PAGE_LIMIT } from 'utilities/config'
import { useLoadData } from 'utilities/hooks'

import Button from 'components/Button'
import HomePage from 'views/HomePage.jsx'
import DetailPage from 'views/DetailPage.jsx'

const App = () => {
  const [countries, isLoading, error] = useLoadData(`${API_ENDPOINT}/all`)
  const [regions, setRegions] = useState()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [limit, setLimit] = useState(PAGE_LIMIT)

  const filteredCountries = countries?.filter(
    ({ name, region }) =>
      name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) &&
      (!filterTerm || filterTerm === 'Show all' || region === filterTerm)
  )

  const handleSetColorMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const handleShowMore = () => {
    setLimit(prevValue => prevValue + PAGE_LIMIT)
  }

  // log only if countries changed
  useEffect(() => {
    console.log('App countries', countries)

    if (countries) {
      // Set regions
      const allRegions = countries.reduce((regions, country) => {
        if (!regions?.includes(country.region)) {
          return [...regions, country.region]
        } else {
          return regions
        }
      }, [])

      setRegions([...allRegions, 'Show all'])
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
        <Button
          className='dark-mode-btn'
          label='Dark Mode'
          icon={{
            name: 'dark_mode',
            type: 'outlined'
          }}
          isTransparent
          onClick={handleSetColorMode}
        />
      </header>
      <main className='main'>
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                <HomePage
                  filteredCountries={filteredCountries}
                  error={error}
                  loading={isLoading}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  regions={regions}
                  filterTerm={filterTerm}
                  setFilterTerm={setFilterTerm}
                  limit={limit}
                  handleShowMore={handleShowMore}
                />
              }
            />
            <Route path=':id' element={<DetailPage />} />
          </Routes>
        </Router>
      </main>
    </div>
  )
}

export default App
