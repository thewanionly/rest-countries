// fetch from API
const fetchFromUrl = async url => {
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) throw new Error(`Error fetching (${response.status})`)

    return data
  } catch (error) {
    console.error('Error log: ', error)
    throw error
  }
}

const titleCase = str => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

export { fetchFromUrl, titleCase }
