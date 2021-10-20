import PropTypes from 'prop-types'

const Icon = ({ className = '', name, type = '', onClick }) => {
  const iconClassName = `icon material-icons${type ? `-${type}` : ''} ${className} ${
    onClick ? 'clickable' : ''
  }`

  return (
    <i className={iconClassName} onClick={onClick}>
      {name}
    </i>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['outlined', 'two-tone', 'round', 'sharp']),
  onClick: PropTypes.func
}

export default Icon
