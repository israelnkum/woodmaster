import { Types } from '../actions/logout/Types'
import rootReducer from './index'
const initialState = {}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case Types.LOGOUT:
      return rootReducer(undefined, action)
    default:
      return state
  }
}
