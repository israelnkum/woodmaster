import { Types } from './Types'
import axios from 'axios'
import sessionStorage from 'redux-persist/lib/storage/session'

export const logout = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios.post('/logout').then((res) => {
      dispatch({
        type: Types.LOGOUT
      })
      sessionStorage.removeItem('persist:root')
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}
