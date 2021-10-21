import { useState, useEffect } from 'react'

import { fetchFromUrl } from 'utilities/helpers'

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
const useLoadData = (url, cacheResults = true) => {
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
        let data = localStorage.getItem(url)

        if (data) {
          // Parse data from localStorage to JS object
          data = JSON.parse(data)
        } else {
          // Get data from API
          data = await fetchFromUrl(url)

          // Store data in localStorage
          cacheResults && localStorage.setItem(url, JSON.stringify(data))
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
  }, [url, cacheResults])

  return [data, isLoading, error]
}

export default useLoadData
