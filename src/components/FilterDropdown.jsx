import { useState } from 'react'

import Icon from 'components/Icon'

const FilterDropdown = ({
  options,
  value,
  placeholder = 'Filter',
  onChange: handleSetFilterValue
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  const handleToggleOptions = () => {
    setIsOptionsOpen(prevValue => !prevValue)
  }

  const handleSelectOption = value => {
    handleSetFilterValue(value)
    setIsOptionsOpen(false)
  }

  return (
    <div className='filter-dropdown'>
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

export default FilterDropdown
