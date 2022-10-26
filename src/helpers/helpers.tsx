import axios from '../utils/axios'

export const getPanels = async () => {
	const result = await axios.get('/panels')

	console.log(result.data)

	return result.data
}

export const calculateOptimumTilt = (lat: number, date: Date): number => {
	const getSeason = () => date.getMonth() + 1
	const season = getSeason()
    console.log(season)
	if ([12,1,2].includes(season)) {
        console.log('Winter')
		// Winter
		return lat * 0.9 + 29
	} else if ([5,6,7].includes(season)) {
        console.log('Summer')
		// Summer
		return lat * 0.9 - 23.5 
	} 

    console.log('fall')
    // Spring or Fall
    return lat * 0.9 - 2.5 
}
