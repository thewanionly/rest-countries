import { useNavigate, useParams } from 'react-router-dom'

import { API_ENDPOINT } from 'utilities/config'
import { useLoadData } from 'utilities/hooks'
import { camelCaseToStandardFormat } from 'utilities/helpers'

const DetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
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
        <button onClick={handleBackClick}>Back</button>
      </div>
      <div className='detail__content'>
        {countryDetail && !error && !isLoading ? (
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
