import { useState, useEffect } from 'react'

import { API_ENDPOINT } from 'utilities/config'
import { useLoadData } from 'utilities/hooks'

const DetailPage = ({ selectedCountry, handleShowDetailPage }) => {
  const [countryDetail, isLoading, error] = useLoadData(`${API_ENDPOINT}/alpha/${selectedCountry}`)

  const handleBackClick = () => {
    handleShowDetailPage(undefined)
  }

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
          isLoading && <h1>Loading...</h1>
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
