import Icon from 'components/Icon.jsx'

const SearchBar = ({ value, placeholder = 'Search...', onChange }) => {
  return (
    <div className='search-bar'>
      <Icon name='search' />
      <input type='text' placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

export default SearchBar
