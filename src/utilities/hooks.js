import { useState, useEffect } from 'react'

import { fetchFromUrl } from 'utilities/helpers'

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
        let data = localStorage.getItem(url)

        if (data) {
          // Parse data from localStorage to JS object
          data = JSON.parse(data)
        } else {
          // Get data from API
          data = await fetchFromUrl(url)

          // Store data in localStorage
          localStorage.setItem(url, JSON.stringify(data))
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

export { useLoadData }
