import { AxiosResponse } from 'axios'
import { User } from '../models/User'
import axios from '../utils/axios'

const responseBody = (response: AxiosResponse) => response.data

export const signupUser = async (payload: User): Promise<any> => {
    const response = await axios.post('/user/signup', { ...payload })
    return responseBody(response)
}

export const loginUser = async (payload: Partial<User>): Promise<any> => {
    const response = await axios.post('/user/login', {
        email: payload.email,
        password: payload.password,
    })
    return responseBody(response)
}
