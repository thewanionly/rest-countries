import { useState, useEffect } from 'react'

import { API_ENDPOINT } from 'utilities/config'
import { fetchFromUrl } from 'utilities/helpers'

const DetailPage = ({ selectedCountry, handleShowDetailPage }) => {
  const [countryDetail, setCountryDetail] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleBackClick = () => {
    handleShowDetailPage(undefined)
  }

  useEffect(() => {
    // load countries
    const loadCountryDetail = async () => {
      const localStorageKey = `country-detail-${selectedCountry}`

      try {
        setLoading(true)
        // Get country detail from localStorage
        let data = localStorage.getItem(localStorageKey)

        if (data) {
          // Parse data from localStorage to JS object
          data = JSON.parse(data)
        } else {
          // Get countries from API
          data = await fetchFromUrl(`${API_ENDPOINT}/alpha/${selectedCountry}`)

          // Store data in localStorage
          localStorage.setItem(localStorageKey, JSON.stringify(data))
        }

        // Set countries
        setCountryDetail(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    loadCountryDetail()
  }, [])

  console.log('Country detail', countryDetail)

  return (
    <div className='detail'>
      <div className='detail__header'>
        <button onClick={handleBackClick}>Back</button>
      </div>
      <div className='detail__content'>
        {countryDetail ? (
          <CountryDetail data={countryDetail} />
        ) : error ? (
          <h1>{`There's an error: ${error}`}</h1>
        ) : (
          loading && <h1>Loading...</h1>
        )}
      </div>
    </div>
  )
}

const CountryDetail = ({ data = {} }) => {
  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders
  } = data

  return (
    <div className='country-detail'>
      <div className='country-detail__flag'>
        <img className='country-detail__flag__img' src={flag} alt={name} />
      </div>
      <div className='country-detail__details'>
        <h1 className='country-detail__details__name'>{name}</h1>
        <div className='country-detail__details__population'>
          <strong>Population: </strong>
          {population}
        </div>
        <div className='country-detail__details__region'>
          <strong>Region: </strong>
          {region}
        </div>
        <div className='country-detail__details__capital'>
          <strong>Capital: </strong>
          {capital}
        </div>
      </div>
    </div>
  )
}

export default DetailPage
