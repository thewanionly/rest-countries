import { USER_LOCALE } from 'utilities/config'

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

// converts first letter of a string to uppercase
const titleCase = str => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

// converts "camelCase" to "Standard Format"
const camelCaseToStandardFormat = (str, separator = ' ') => {
  if (!str) return str

  return titleCase(str.split(/(?=[A-Z])/).join(separator))
}

// formats number depending on locale
const formatNumber = (number, locale = USER_LOCALE) => {
  return new Intl.NumberFormat(locale).format(number)
}

export { fetchFromUrl, titleCase, camelCaseToStandardFormat, formatNumber }
