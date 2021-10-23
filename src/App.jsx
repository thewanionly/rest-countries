import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useDarkMode } from 'utilities/hooks'

import Button from 'components/Button'

import HomePage from 'views/HomePage.jsx'
import DetailPage from 'views/DetailPage.jsx'

const App = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode()

  const darkModeBtnIconProps = { name: 'dark_mode', ...(!isDarkMode && { type: 'outlined' }) }

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
            <Route path='/' element={<HomePage />} />
            <Route path=':id' element={<DetailPage />} />
          </Routes>
        </Router>
      </main>
    </div>
  )
}

export default App
