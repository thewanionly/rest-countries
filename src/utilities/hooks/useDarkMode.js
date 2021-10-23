import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setDarkMode } from 'store/actions'
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
  // Declare darkMode state
  const darkMode = useSelector(({ darkMode }) => darkMode)

  // Dark mode flag toggle handler
  const dispatch = useDispatch()

  const handleToggleDarkMode = () => {
    const newValue = !darkMode

    // Set darkMode state
    dispatch(setDarkMode(newValue))

    // Store new darkMode value to localStorage
    localStorage.setItem('darkMode', JSON.stringify(newValue))
  }

  //Set default value during first mount
  useEffect(() => {
    //  Get data from localStorage
    let isDarkModeInLocalStorage = localStorage.getItem('darkMode')
    isDarkModeInLocalStorage = isDarkModeInLocalStorage && JSON.parse(isDarkModeInLocalStorage) // Parse data from localStorage to JS object

    // Get data from browser theme
    const isDarkModeInBrowser = window.matchMedia('(prefers-color-scheme: dark)').matches

    // (default value from localStorage -> browser -> false)
    const defaultValue = isDarkModeInLocalStorage ?? isDarkModeInBrowser ?? false

    dispatch(setDarkMode(defaultValue))
  }, [dispatch])

  return [darkMode, handleToggleDarkMode]
}

export default useDarkMode
