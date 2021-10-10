import PropTypes from 'prop-types'

const Icon = ({ className = '', name, type = '', onClick }) => {
  return (
    <i
      className={`icon material-icons${type ? `-${type}` : ''} ${className} ${
        onClick ? 'clickable' : ''
      }`}
      onClick={onClick}
    >
      {name}
    </i>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['outlined', 'two-tone', 'round', 'sharp'])
}

export default Icon
