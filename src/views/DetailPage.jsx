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
          <CountryDetail data={countryDetail} handleShowDetailPage={handleShowDetailPage} />
        ) : error ? (
          <h1>{`There's an error: ${error}`}</h1>
        ) : (
          isLoading && <h1>Loading...</h1>
        )}
      </div>
    </div>
  )
}

const CountryDetail = ({ data = {}, handleShowDetailPage }) => {
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

  const leftDetails = [
    {
      label: 'Native Name',
      value: nativeName
    },
    {
      label: 'Population',
      value: population
    },
    {
      label: 'Region',
      value: region
    },
    {
      label: 'Sub Region',
      value: subregion
    },
    {
      label: 'Capital',
      value: capital
    }
  ]

  const rightDetails = [
    {
      label: 'Top Level Domain',
      value: topLevelDomain?.join(', ') || ''
    },
    {
      label: 'Currencies',
      value: currencies?.map(({ name }) => name).join(', ') || ''
    },
    {
      label: 'Languages',
      value: languages?.map(({ name }) => name).join(', ') || ''
    }
  ]

  return (
    <div className='country-detail'>
      <div className='country-detail__flag'>
        <img className='country-detail__flag__img' src={flag} alt={name} />
      </div>
      <div className='country-detail__details'>
        <h1 className='country-detail__details__name'>{name}</h1>
        <div className='country-detail__details__left'>
          {leftDetails.map(item => (
            <CountryDetailRow key={item.value} {...item} />
          ))}
        </div>
        <div className='country-detail__details__right'>
          {rightDetails.map(item => (
            <CountryDetailRow key={item.value} {...item} />
          ))}
        </div>
        <div className='country-detail__details__border-countries'>
          <strong>Border Countries:</strong>
          {borders ? (
            borders?.map(border => (
              <button key={border} onClick={() => handleShowDetailPage(border)}>
                {border}
              </button>
            ))
          ) : (
            <em>No border countries</em>
          )}
        </div>
      </div>
    </div>
  )
}

const CountryDetailRow = ({ label, value }) => {
  return (
    <div className='country-detail__details__row'>
      <strong>{`${label}: `}</strong>
      <span>{value}</span>
    </div>
  )
}

export default DetailPage
