import PropTypes from 'prop-types'

const Icon = ({ className = '', name, type = '' }) => {
  return <i className={`material-icons${type ? `-${type}` : ''} ${className}`}>{name}</i>
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['outlined', 'two-tone', 'round', 'sharp'])
}

export default Icon
