const FilterDropdown = ({
  options,
  value,
  placeholder = 'Filter',
  onChange: handleSetFilterValue
}) => {
  const handleFilter = e => {
    handleSetFilterValue(e.target.value)
  }

  return (
    <div className='filter-dropdown'>
      <select value={value} onChange={handleFilter}>
        <option value='' disabled selected>
          {placeholder}
        </option>
        {options?.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterDropdown
