import { USER_LOCALE, TIMEOUT_SEC } from 'utilities/config'

/**
 * Promisifed timeout
 */
const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${sec} second. Please try again.`))
    }, sec * 1000)
  })
}

/**
 * fetch from API
 */
const fetchFromUrl = async url => {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)])
    const data = await response.json()

    if (!response.ok) throw new Error(`Error fetching (${response.status})`)

    return data
  } catch (error) {
    console.error('Error log: ', error)
    throw error
  }
}

/**
 * converts first letter of a string to uppercase
 */
const titleCase = str => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

/**
 * converts "camelCase" to "Standard Format"
 */
const camelCaseToStandardFormat = (str, separator = ' ') => {
  if (!str) return str

  return titleCase(str.split(/(?=[A-Z])/).join(separator))
}

/**
 * formats number depending on locale
 */
const formatNumber = (number, locale = USER_LOCALE) => {
  if (!number) return ''

  return new Intl.NumberFormat(locale).format(number)
}

export { fetchFromUrl, titleCase, camelCaseToStandardFormat, formatNumber }
