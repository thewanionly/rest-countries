import { useNavigate, useParams } from 'react-router-dom'

import { RESOURCE_COUNTRIES, RESOURCE_COUNTRY_DETAIL } from 'utilities/config'
import { useFetchData } from 'utilities/hooks'
import { camelCaseToStandardFormat, formatNumber } from 'utilities/helpers'

import { Button } from 'components'

const DUMMY_BUTTONS = [...new Array(3)]

const DetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [countries, isLoadingCountries, errorCountries] = useFetchData(RESOURCE_COUNTRIES)
  const [countryDetail, isLoading, error] = useFetchData(RESOURCE_COUNTRY_DETAIL, id)

  const handleBackClick = () => {
    navigate('/')
  }

  const handleShowDetailPage = country => {
    navigate(`/${country.toLowerCase()}`)
  }

  return (
    <div className='detail'>
      <div className='detail__header'>
        <Button label='Back' icon='arrow_back' onClick={handleBackClick} />
      </div>
      <div className='detail__content'>
        {isLoading || isLoadingCountries ? (
          <CountryDetail loading />
        ) : error || errorCountries ? (
          <h1>{`There's an error: ${error || errorCountries}`}</h1>
        ) : (
          countryDetail &&
          countries && (
            <CountryDetail
              data={countryDetail}
              allCountries={countries}
              handleShowDetailPage={handleShowDetailPage}
            />
          )
        )}
      </div>
    </div>
  )
}

const CountryDetail = ({ data = {}, allCountries, handleShowDetailPage, loading }) => {
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
  const imgLoadingClassName = loading ? ' skeleton' : ''
  const bigTextLoadingClassName = loading
    ? ' skeleton skeleton-text skeleton-text--big skeleton-text--half-width'
    : ''
  const buttonLoadingClassName = loading ? ' skeleton skeleton-button' : ''

  const formatLabel = label => {
    if (label === 'subregion') {
      return 'Sub Region'
    }

    return camelCaseToStandardFormat(label)
  }

  return (
    <div className='country-detail'>
      <div className={`country-detail__flag${imgLoadingClassName}`}>
        <img className='country-detail__flag__img' src={flag} alt={name} />
      </div>
      <div className='country-detail__details'>
        <div className={`country-detail__details__main${bigTextLoadingClassName}`}>
          <h1>{name}</h1>
        </div>
        <div className='country-detail__details__sub'>
          <div className='country-detail__details__sub__left'>
            {Object.entries({
              nativeName,
              population: formatNumber(population),
              region,
              subregion,
              capital
            }).map(([label, value], index) => (
              <CountryDetailRow
                key={label + value + index}
                label={formatLabel(label)}
                value={value}
                loading={loading}
              />
            ))}
          </div>
          <div className='country-detail__details__sub__right'>
            {Object.entries({
              topLevelDomain: topLevelDomain?.join(', ') || '',
              currencies: currencies?.map(({ name }) => name).join(', ') || '',
              languages: languages?.map(({ name }) => name).join(', ') || ''
            }).map(([label, value], index) => (
              <CountryDetailRow
                key={label + value + index}
                label={formatLabel(label)}
                value={value}
                loading={loading}
              />
            ))}
          </div>
        </div>

        <div className='country-detail__details__border-countries'>
          <strong>Border Countries:</strong>
          {loading ? (
            DUMMY_BUTTONS?.map((b, index) => (
              <Button key={index} className={buttonLoadingClassName} />
            ))
          ) : borders ? (
            borders?.map((border, index) => (
              <Button
                key={border + index}
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

const CountryDetailRow = ({ label, value, loading }) => {
  const textLoadingClassName = loading ? ' skeleton skeleton-text' : ''

  return (
    <div className='country-detail__details__row'>
      <strong className='country-detail__details__row--label'>{`${label}: `}</strong>
      <span className={`country-detail__details__row--value${textLoadingClassName}`}>{value}</span>
    </div>
  )
}

export default DetailPage
