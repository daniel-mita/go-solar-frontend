import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react'
import { loginUser, signupUser } from '../api/auth'
import { User } from '../models/User'
import { LoginInfo } from '../pages/Home'

type AuthContextState = {
    isLoading: boolean
    isSignedIn: boolean
    setIsSignedIn: Dispatch<SetStateAction<boolean>>
    login: (loginInfo: LoginInfo<string>) => Promise<void>
    signUp: (regInfo: User) => Promise<void>
    logout: () => Promise<void>
}

const contextDefaultValues: AuthContextState = {
    isLoading: false,
    isSignedIn: false,
    setIsSignedIn: async () => undefined,
    login: async () => undefined,
    signUp: async () => undefined,
    logout: async () => undefined,
}

export const AuthContext = createContext(contextDefaultValues)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSignedIn, setIsSignedIn] = useState(false)

    const login = async (loginInfo: LoginInfo<string>) => {
        try {
            const response = await loginUser({
                email: loginInfo.email,
                password: loginInfo.password,
            })
            if (response.token) {
                setIsSignedIn(true)
                localStorage.setItem('token', JSON.stringify(response.token))
                loadStorageToken()
            }
        } catch (e) {
            throw e
        }
    }

    const signUp = async (payload: User) => {
        try {
            const response = await signupUser(payload)
            // navigate('/login')
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    const logout = async () => {
        localStorage.removeItem('token')
        loadStorageToken()
    }

    const loadStorageToken = async () => {
        const storedToken = localStorage.getItem('token')
        let parsedToken = null
        if (storedToken) parsedToken = JSON.parse(storedToken)
        if (parsedToken) {
            setIsSignedIn(true)
        } else {
            setIsSignedIn(false)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        loadStorageToken()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isSignedIn,
                setIsSignedIn,
                login,
                signUp,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
