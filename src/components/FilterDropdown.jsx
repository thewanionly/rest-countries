import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/Icon'

const FilterDropdown = ({
  value,
  placeholder = 'Filter',
  options,
  onChange: handleSetFilterValue
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const dropdownRef = useRef()

  const handleToggleOptions = () => {
    setIsOptionsOpen(prevValue => !prevValue)
  }

  const handleSelectOption = value => {
    handleSetFilterValue(value)
    setIsOptionsOpen(false)
  }

  // Close dropdown options when user clicked outside
  useEffect(() => {
    const handleClick = e => {
      if (dropdownRef?.current && !dropdownRef.current.contains(e.target)) {
        setIsOptionsOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [dropdownRef, setIsOptionsOpen])

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
        {options?.map(option => (
          <div
            className={`filter-dropdown__options__item${option === 'Show all' ? ' break' : ''}`}
            key={option}
            value={option}
            onClick={() => handleSelectOption(option)}
          >
            {option === 'Show all' ? <em>{option}</em> : option}
          </div>
        ))}
      </div>
    </div>
  )
}

FilterDropdown.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default FilterDropdown
