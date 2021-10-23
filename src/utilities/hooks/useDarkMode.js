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
  // 1. Get data from localStorage
  let isDarkModeInLocalStorage = localStorage.getItem('darkMode')
  isDarkModeInLocalStorage = isDarkModeInLocalStorage && JSON.parse(isDarkModeInLocalStorage) // Parse data from localStorage to JS object

  // 2. Get data from browser theme
  const isDarkModeInBrowser = window.matchMedia('(prefers-color-scheme: dark)').matches

  // 3. Declare darkMode state (default value from localStorage -> browser -> false)
  const defaultValue = isDarkModeInLocalStorage ?? isDarkModeInBrowser ?? false
  const darkModeState = useSelector(({ darkMode }) => darkMode)
  const darkMode = darkModeState ?? defaultValue

  // 4. Dark mode flag toggle handler
  const dispatch = useDispatch()

  const handleToggleDarkMode = () => {
    const newValue = !darkMode

    // Set darkMode state
    dispatch(setDarkMode(newValue))

    // Store new darkMode value to localStorage
    localStorage.setItem('darkMode', JSON.stringify(newValue))
  }

  return [darkMode, handleToggleDarkMode]
}

export default useDarkMode
