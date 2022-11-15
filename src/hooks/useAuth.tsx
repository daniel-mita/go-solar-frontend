import { loginUser } from '../api/auth'

const useAuth = () => {
    const login = async ({
        email,
        password,
    }: {
        email: string | undefined
        password: string | undefined
    }) => {
        try {
            const response = await loginUser({ email, password })
            return response.token
        } catch (e) {
            console.log(e)
        }
    }

    return {
        login,
    }
}

export default useAuth
