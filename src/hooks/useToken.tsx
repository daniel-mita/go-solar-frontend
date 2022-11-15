import { useState } from 'react'

const useToken = () => {
    const getToken = () => {
        const tokenString = localStorage.getItem('token')
        if (tokenString) {
            // const userToken = JSON.parse(tokenString)
            return tokenString
        }
        return null
    }

    const [token, setToken] = useState(getToken())

    const saveToken = (userToken: { token: string }) => {
        localStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
    }

    const removeToken = () => {
        localStorage.removeItem('token')
    }

    return {
        setToken: saveToken,
        token,
        removeToken,
    }
}

export default useToken
