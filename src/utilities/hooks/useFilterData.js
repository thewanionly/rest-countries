import { useSelector, useDispatch } from 'react-redux'

import { setSearchTerm, setFilterTerm } from 'store/actions'
/**
 * Filters data based on fitlerFields ['search', 'filter']
 */
const useFilterData = (data, filterFields) => {
  const dispatch = useDispatch()
  const [searchTerm, filterTerm] = useSelector(({ countries: { searchTerm, filterTerm } = {} }) => [
    searchTerm,
    filterTerm
  ])

  const { searchField, filterField } = filterFields

  const filteredCountries = data?.filter(
    data =>
      (!searchTerm || data[searchField].toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterTerm || data[filterField] === filterTerm)
  )

  const handleSetSearchTerm = value => {
    dispatch(setSearchTerm(value))
  }

  const handleSetFilterTerm = value => {
    dispatch(setFilterTerm(value))
  }

  return [
    filteredCountries,
    { searchTerm, filterTerm },
    {
      setSearchTerm: handleSetSearchTerm,
      setFilterTerm: handleSetFilterTerm
    }
  ]
}

export default useFilterData
