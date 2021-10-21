import { useState } from 'react'

/**
 * Filters data based on fitlerFields ['search', 'filter']
 */
const useFilterData = (data, filterFields) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  const { searchField, filterField } = filterFields

  const filteredCountries = data?.filter(
    data =>
      (!searchTerm || data[searchField].toLowerCase().includes(searchTerm.toLocaleLowerCase())) &&
      (!filterTerm || data[filterField] === filterTerm)
  )

  return [filteredCountries, { searchTerm, filterTerm }, { setSearchTerm, setFilterTerm }]
}

export default useFilterData
