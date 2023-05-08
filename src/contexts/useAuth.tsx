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
import { spawnToast } from '../utils/errors/Toast'
import { CoordinatesContext } from './useCoordinates'

type AuthContextState = {
    isLoading: boolean
    isSignedIn: boolean
    setIsSignedIn: Dispatch<SetStateAction<boolean>>
    login: (loginInfo: LoginInfo<string>) => Promise<void>
    signUp: (regInfo: User) => Promise<string | undefined>
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

    const { setIsFirstTime } = useContext(CoordinatesContext)

    const checkCredentials = (user: User) => {
        //     This regular expression matches any string that:
        // Starts with one or more characters that are not whitespace or @.
        // Is followed by an @ symbol.
        // Is followed by one or more characters that are not whitespace or @.
        // Is followed by a dot.
        // Ends with one or more characters that are not whitespace or @.
        // This regular expression is a simple and minimal way to validate email addresses.
        //  It doesn't cover all possible variations of email addresses (which can be quite complex),
        //   but it should catch most common mistakes and prevent obvious invalid inputs.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!user.email || !emailRegex.test(user.email)) {
            throw new Error('Invalid email address')
        }

        if (!user.username) {
            throw new Error('Username is required')
        }

        if (!user.password || user.password.length < 8) {
            throw new Error('Password must be at least 8 characters long')
        }
    }

    const login = async (loginInfo: LoginInfo<string>) => {
        try {
            const response = await loginUser({
                email: loginInfo.email,
                password: loginInfo.password,
            })
            if (response.user) {
                localStorage.setItem('username', response.user)
            }
            if (response.avatarSeed) {
                localStorage.setItem('avatar_seed', response.avatarSeed)
            }
            if (response.token) {
                setIsSignedIn(true)
                localStorage.setItem('token', JSON.stringify(response.token))
                loadStorageToken()
            }
        } catch (e: any) {
            if (e.request.status === 401) {
                spawnToast(
                    'Wrong credentials',
                    'Please provide the right credentials in order to login',
                    false
                )
            }
        }
    }

    const signUp = async (payload: User) => {
        try {
            checkCredentials(payload)
            const response = await signupUser(payload)
            return 'Succesfull'
        } catch (e: any) {
            if (e.message)
                spawnToast(
                    'Something wrong with the credentials',
                    e.message,
                    false
                )
            else spawnToast('Something went wrong', e.request.message, false)
        }
    }

    const logout = async () => {
        localStorage.removeItem('token')
        setIsFirstTime(true)
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
