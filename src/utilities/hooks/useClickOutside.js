import { useEffect, useRef } from 'react'

/**
 * Detects if the user clicks outside the specified ref/element.
 *
 * @param {function} action - Callback function to execute when user clicks outside
 * @returns {ref} - Reference to the element
 */
const useClickOutside = action => {
  const elementRef = useRef()

  useEffect(() => {
    const handleClick = e => {
      if (elementRef?.current && !elementRef.current.contains(e.target)) {
        // call action callback when user clicked outside
        action?.()
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [elementRef, action])

  return elementRef
}

export default useClickOutside
