import axios from 'axios'

import { BASE_URL } from './config'

let axiosInstance = axios.create({
    baseURL: BASE_URL,
})

const errorHandler = (error: any) => {
    return Promise.reject(error)
}

const requestHandler = (request: any) => {
    const token = JSON.parse(localStorage.getItem('token')!)
    if (request.headers) {
        request.headers['Content-Type'] = 'application/json'
        request.headers.Authorization = `Bearer ${token}` || ''
    }

    return request
}

axiosInstance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
)

export default axiosInstance
