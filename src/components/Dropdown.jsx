import { useState } from 'react'
import PropTypes from 'prop-types'

import { useClickOutside } from 'utilities/hooks'

import Icon from 'components/Icon'

const Dropdown = ({ value, placeholder = 'Filter', options, onChange: handleSetFilterValue }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  const handleToggleOptions = () => {
    setIsOptionsOpen(prevValue => !prevValue)
  }

  const handleCloseOptions = () => {
    setIsOptionsOpen(false)
  }

  const handleSelectOption = value => {
    handleSetFilterValue(value)
    handleCloseOptions()
  }

  // Close dropdown options when user clicked outside
  const dropdownRef = useClickOutside(handleCloseOptions)

  return (
    <div className='filter-dropdown' ref={dropdownRef}>
      <div className='filter-dropdown__select' onClick={handleToggleOptions}>
        <div className='filter-dropdown__select__text'>{value || placeholder}</div>
        <Icon
          className='filter-dropdown__select__arrow-icon'
          name={isOptionsOpen ? 'expand_less' : 'expand_more'}
        />
      </div>
      <div className={`filter-dropdown__options${!isOptionsOpen ? ' hide' : ''}`}>
        {options?.map(({ label, value }) => (
          <div
            className={`filter-dropdown__options__item${label === 'Show all' ? ' break' : ''}`}
            key={label}
            onClick={() => handleSelectOption(value)}
          >
            {label === 'Show all' ? <em>{label}</em> : label}
          </div>
        ))}
      </div>
    </div>
  )
}

Dropdown.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default Dropdown
