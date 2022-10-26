import axios from 'axios';

import { BASE_URL } from './config'

let axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async config => {
    const token = "a token from somewhere"

    if (config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default axiosInstance;