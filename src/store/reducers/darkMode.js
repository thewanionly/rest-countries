import { SET_DARK_MODE } from 'store/actions/types.js'

const INITIAL_STATE = null

const darkMode = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  let newState = state

  switch (type) {
    case SET_DARK_MODE:
      newState = payload
      break
    default:
      newState = state
  }

  return newState
}

export default darkMode
