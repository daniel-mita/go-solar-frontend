import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react'

type LoadingState = {
    refetchImages: boolean
    setRefetchImages: Dispatch<SetStateAction<boolean>>
}

const contextDefaultValues: LoadingState = {
    refetchImages: false,
    setRefetchImages: async () => undefined,
}

export const LoadingContext = createContext(contextDefaultValues)

const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [refetchImages, setRefetchImages] = useState(false)

    return (
        <LoadingContext.Provider
            value={{
                refetchImages,
                setRefetchImages,
            }}
        >
            {children}
        </LoadingContext.Provider>
    )
}

export const useAuth = () => useContext(LoadingContext)

export default LoadingProvider
