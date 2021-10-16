import { useNavigate } from 'react-router-dom'
import { titleCase } from 'utilities/helpers'

const CountriesCard = ({ data = {}, loading }) => {
  const navigate = useNavigate()

  const { alpha2Code, flag, name, population, region, capital } = data
  const imgLoadingClassName = loading ? ' skeleton' : ''
  const textLoadingClassName = loading ? ' skeleton skeleton-text' : ''

  const handleCardClick = () => {
    navigate(`/${alpha2Code.toLowerCase()}`)
  }

  return (
    <div className='countries-card' onClick={handleCardClick}>
      <div className={`countries-card__flag${imgLoadingClassName}`}>
        <img className='countries-card__flag__img' src={flag} alt={name} />
      </div>
      <div className='countries-card__details'>
        <div className={`countries-card__details__main${textLoadingClassName}`}>
          <h3>{name}</h3>
        </div>
        {Object.entries({ population, region, capital }).map(([label, value]) => (
          <div className='countries-card__details__sub'>
            <strong className='countries-card__details__sub--label'>{`${titleCase(
              label
            )}:`}</strong>
            <span className={`countries-card__details__sub--value${textLoadingClassName}`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountriesCard
