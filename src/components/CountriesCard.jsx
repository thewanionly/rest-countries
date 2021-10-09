import { useNavigate } from 'react-router-dom'

const CountriesCard = ({ data = {} }) => {
  const navigate = useNavigate()

  const { alpha2Code, flag, name, population, region, capital } = data

  const handleCardClick = () => {
    navigate(`/${alpha2Code.toLowerCase()}`)
  }

  return (
    <div className='countries-card' onClick={handleCardClick}>
      <div className='countries-card__flag'>
        <img className='countries-card__flag__img' src={flag} alt={name} />
      </div>
      <div className='countries-card__details'>
        <h3 className='countries-card__details__name'>{name}</h3>
        <div className='countries-card__details__population'>
          <strong>Population: </strong>
          {population}
        </div>
        <div className='countries-card__details__region'>
          <strong>Region: </strong>
          {region}
        </div>
        <div className='countries-card__details__capital'>
          <strong>Capital: </strong>
          {capital}
        </div>
      </div>
    </div>
  )
}

export default CountriesCard
