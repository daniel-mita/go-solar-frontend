import { AxiosResponse } from 'axios'
import { Configurations, Coordinates } from '../models/Coordinates'
import axios from '../utils/axios'

const responseBody = (response: AxiosResponse) => response.data.results

type CalculationsResponse = {
    maximum: {
        panelsNumber: number
        installedPower: number
        panelsCost: number
        recoverPeriod: number
        generatedMoney: number
        generatedElectricity: number
        consumedMoney: number
        consumedElectricity: number
    }
    aditionalCosts: {
        invertor: number
        installation: number
    }
}

export const getResults = async (
    coordinates: Coordinates,
    configurations: Configurations
): Promise<CalculationsResponse> => {
    const response = await axios.post('/results/calculations', {
        coordinates: coordinates,
        configurations: configurations,
    })
    return responseBody(response)
}
