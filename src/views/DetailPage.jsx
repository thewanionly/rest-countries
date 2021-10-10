import { useNavigate, useParams } from 'react-router-dom'

import { API_ENDPOINT } from 'utilities/config'
import { useLoadData } from 'utilities/hooks'
import { camelCaseToStandardFormat } from 'utilities/helpers'

import Button from 'components/Button'

const DetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [countries, isLoadingCountries, errorCountries] = useLoadData(`${API_ENDPOINT}/all`)
  const [countryDetail, isLoading, error] = useLoadData(`${API_ENDPOINT}/alpha/${id}`)

  const handleBackClick = () => {
    navigate('/')
  }

  const handleShowDetailPage = country => {
    navigate(`/${country.toLowerCase()}`)
  }

  console.log('Country detail', countryDetail)

  return (
    <div className='detail'>
      <div className='detail__header'>
        <Button label='Back' icon='arrow_back' onClick={handleBackClick} />
      </div>
      <div className='detail__content'>
        {countryDetail &&
        countries &&
        !error &&
        !errorCountries &&
        !isLoading &&
        !isLoadingCountries ? (
          <CountryDetail
            data={countryDetail}
            allCountries={countries}
            handleShowDetailPage={handleShowDetailPage}
          />
        ) : error || errorCountries ? (
          <h1>{`There's an error: ${error || errorCountries}`}</h1>
        ) : (
          (isLoading || isLoadingCountries) && <h1>Loading...</h1>
        )}
      </div>
    </div>
  )
}

const CountryDetail = ({ data = {}, allCountries, handleShowDetailPage }) => {
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

  const formatLabel = label => {
    if (label === 'subregion') {
      return 'Sub Region'
    }

    return camelCaseToStandardFormat(label)
  }

  return (
    <div className='country-detail'>
      <div className='country-detail__flag'>
        <img className='country-detail__flag__img' src={flag} alt={name} />
      </div>
      <div className='country-detail__details'>
        <h1 className='country-detail__details__name'>{name}</h1>
        <div className='country-detail__details__left'>
          {Object.entries({ nativeName, population, region, subregion, capital }).map(
            ([label, value]) => (
              <CountryDetailRow key={value} label={formatLabel(label)} value={value} />
            )
          )}
        </div>
        <div className='country-detail__details__right'>
          {Object.entries({
            topLevelDomain: topLevelDomain?.join(', ') || '',
            currencies: currencies?.map(({ name }) => name).join(', ') || '',
            languages: languages?.map(({ name }) => name).join(', ') || ''
          }).map(([label, value]) => (
            <CountryDetailRow key={value} label={formatLabel(label)} value={value} />
          ))}
        </div>
        <div className='country-detail__details__border-countries'>
          <strong>Border Countries:</strong>
          {borders ? (
            borders?.map(border => (
              <Button
                key={border}
                label={
                  allCountries.find(
                    ({ alpha2Code, alpha3Code }) => alpha2Code === border || alpha3Code === border
                  )?.name || border
                }
                onClick={() => handleShowDetailPage(border)}
              />
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
