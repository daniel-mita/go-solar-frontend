import axios from 'axios'

import { BASE_URL } from './config'

let axiosInstance = axios.create({
  baseURL: BASE_URL,
})

const errorHandler = (error: any) => {
  return Promise.reject(error)
}

const requestHandler = (request: any) => {
  const token = 'a token from somewhere'
  if (request.headers) {
    request.headers['Content-Type'] = 'application/json'
    request.headers.Authorization =
      `Bearer ${localStorage.getItem('token')}` || ''
  }

  return request
}

axiosInstance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
)

export default axiosInstance
