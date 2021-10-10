import Icon from 'components/Icon'

const Button = ({ className = '', label, icon, iconPos = 'right', onClick }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && <Icon name={icon} />}
      {label}
    </button>
  )
}

export default Button
