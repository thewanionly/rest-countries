import Icon from 'components/Icon.jsx'

const SearchBar = ({ value, placeholder = 'Search...', onChange: handleSetSearchTerm }) => {
  const handleSearch = e => {
    handleSetSearchTerm(e.target.value)
  }

  const handleClearInput = () => {
    handleSetSearchTerm('')
  }

  return (
    <div className='search-bar'>
      <Icon name='search' />
      <input type='text' placeholder={placeholder} value={value} onChange={handleSearch} />
      {value && <Icon name='close' onClick={handleClearInput} />}
    </div>
  )
}

export default SearchBar
