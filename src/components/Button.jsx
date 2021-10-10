import Icon from 'components/Icon'

const Button = ({ className = '', label, icon, iconPos = 'right', onClick, isTransparent }) => {
  const iconProps = typeof icon === 'object' ? { ...icon } : { name: icon }

  return (
    <button
      className={`button ${className} ${isTransparent ? 'transparent' : ''}`}
      onClick={onClick}
    >
      {icon && <Icon {...iconProps} />}
      {label}
    </button>
  )
}

export default Button
