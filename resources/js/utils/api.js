import axios from 'axios'

export default function api () {
  const makeRequest = axios.create({
    baseURL: process.env.MIX_REACT_APP_API_PATH,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  makeRequest.interceptors.request.use(function (config) {
    // config.headers.Authorization = `Bearer ${authContext.authState.token}`
    // config.headers.Accept = 'application/json'
    // config.headers.ContentType = 'application/json'
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  makeRequest.interceptors.response.use(response => {
    return response
  }, error => {
    const code = error && error.response ? error.response.status : 0
    if (code === 401 || code === 403 || code === 419) {
      window.location.replace('/login')
    }
    return Promise.reject(error)
  }
  )

  return makeRequest
}
