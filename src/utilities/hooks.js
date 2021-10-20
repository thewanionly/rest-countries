import { useState, useEffect, useRef } from 'react'

import { fetchFromUrl } from 'utilities/helpers'

const toAlwaysFetch = false //for dev/testing purposes only, set to default in production

/**
 * Fetches data from specified url, stores in localStorage, sets a state and return that state.
 * If data exists in localStorage, don't fetch.
 *
 * @param {string} url - The API endpoint url to fetch data from
 * @returns {Array} - [
 *   data - results of data fetching
 *   isLoading - loading state of the fetching
 *   error - error received from fetching
 * ]
 */
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

/**
 * Sets dark mode state depending on either localStorage, browser theme or explicit
 * clicking of the user of the dark mode button.
 *
 * @param none
 * @returns {Array} - [
 *   darkMode - dark mode state
 *   handleToggleDarkMode - function that updates darkmode
 * ]
 */
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

/**
 * Detects if the user clicks outside the specified ref/element.
 *
 * @param {function} action - Callback function to execute when user clicks outside
 * @returns {ref} - Reference to the element
 */
const useClickOutside = action => {
  const elementRef = useRef()

  useEffect(() => {
    const handleClick = e => {
      if (elementRef?.current && !elementRef.current.contains(e.target)) {
        // call action callback when user clicked outside
        action?.()
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [elementRef, action])

  return elementRef
}

export { useLoadData, useDarkMode, useClickOutside }
