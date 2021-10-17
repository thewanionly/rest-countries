import { useState, useEffect } from 'react'

import { fetchFromUrl } from 'utilities/helpers'

const toAlwaysFetch = false //for dev/testing purposes only, set to default in production

const useLoadData = url => {
  const [data, setData] = useState()
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // load data
    const loadData = async () => {
      try {
        // Set isLoading to true
        setIsLoading(true)

        // Get data from localStorage
        let data = !toAlwaysFetch && localStorage.getItem(url)

        if (data) {
          // Parse data from localStorage to JS object
          data = JSON.parse(data)
        } else {
          // Get data from API
          data = await fetchFromUrl(url)

          // Store data in localStorage
          !toAlwaysFetch && localStorage.setItem(url, JSON.stringify(data))
        }

        // Set data
        setData(data)

        // Set isLoading to false
        setIsLoading(false)
      } catch (err) {
        // Set error that occurred to error state
        setError(err)

        // Set isLoading to false
        setIsLoading(false)
      }
    }

    // invoke load data
    loadData()
  }, [url])

  return [data, isLoading, error]
}

const useDarkMode = () => {
  // 1. Get data from localStorage
  let isDarkModeInLocalStorage = localStorage.getItem('darkMode')
  isDarkModeInLocalStorage = isDarkModeInLocalStorage && JSON.parse(isDarkModeInLocalStorage) // Parse data from localStorage to JS object

  // 2. Get data from browser theme
  const isDarkModeInBrowser = window.matchMedia('(prefers-color-scheme: dark)').matches

  // 3. Declare darkMode state (default value from localStorage -> browser -> false)
  const [darkMode, setDarkMode] = useState(isDarkModeInLocalStorage ?? isDarkModeInBrowser ?? false)

  // 4. Dark mode flag toggle handler
  const handleToggleDarkMode = () => {
    const newValue = !darkMode

    // Set darkMode state
    setDarkMode(newValue)

    // Store new darkMode value to localStorage
    localStorage.setItem('darkMode', JSON.stringify(newValue))
  }

  return [darkMode, handleToggleDarkMode]
}

export { useLoadData, useDarkMode }
