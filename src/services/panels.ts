import axios from "axios"

export const getPanels = async () => {
	const result = await axios.get('/panels')

	console.log(result.data)

	return result.data
}