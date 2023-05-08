import { AxiosResponse } from 'axios'
import axios from '../utils/axios'

const responseBody = (response: AxiosResponse) => response.data

export const uploadImage = async (file: any): Promise<any> => {
    const payload = { image: file }
    const response = await axios.post('/image/upload', payload)
    return responseBody(response)
}

export const saveImage = async (file: any): Promise<any> => {
    const payload = { image: file }
    const response = await axios.post('/image/save', payload)
    return responseBody(response)
}

export const fetchImages = async (): Promise<any> => {
    const response = await axios.get('/image/list')
    return responseBody(response)
}

export const deleteImage = async (imageId: number): Promise<any> => {
    const response = await axios.delete('/image/remove/' + imageId)
    return responseBody(response)
}
