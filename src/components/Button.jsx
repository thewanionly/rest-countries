import PropTypes from 'prop-types'

import Icon from 'components/Icon'

const Button = ({ className = '', label, icon, isTransparent, onClick }) => {
  const buttonClassName = `button ${className} ${isTransparent ? 'transparent' : ''}`
  const iconProps = typeof icon === 'object' ? { ...icon } : { name: icon }

  return (
    <button className={buttonClassName} onClick={onClick}>
      {icon && <Icon {...iconProps} />}
      {label}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.shape(Icon.propTypes)]),
  isTransparent: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
