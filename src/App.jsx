import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { PAGE_LIMIT } from 'utilities/config'
import { useDarkMode, useData } from 'utilities/hooks'

import Button from 'components/Button'

import HomePage from 'views/HomePage.jsx'
import DetailPage from 'views/DetailPage.jsx'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [countries, isLoading, error] = useData('countries')
  const [regions, isLoadingRegions, errorRegions] = useData('regions')
  const [isDarkMode, toggleDarkMode] = useDarkMode()
  const [limit, setLimit] = useState(PAGE_LIMIT)

  const darkModeBtnIconProps = { name: 'dark_mode', ...(!isDarkMode && { type: 'outlined' }) }

  const handleShowMore = () => {
    setLimit(prevValue => prevValue + PAGE_LIMIT)
  }

  return (
    <div className={`app${isDarkMode ? ' dark-mode' : ''}`}>
      <header className='navbar'>
        <h1>Where in the world?</h1>
        <Button
          className='dark-mode-btn'
          label='Dark Mode'
          icon={darkModeBtnIconProps}
          isTransparent
          onClick={toggleDarkMode}
        />
      </header>
      <main className='main'>
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                <HomePage
                  data={countries}
                  error={error || errorRegions}
                  loading={isLoading || isLoadingRegions}
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
