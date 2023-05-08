import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react'
import { Coordinates } from '../models/Coordinates'

type CoordinatesState = {
    isFirstTime: boolean
    setIsFirstTime: Dispatch<SetStateAction<boolean>>
    coordinates: Coordinates
    setCoordinates: Dispatch<SetStateAction<Coordinates>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

const contextDefaultValues: CoordinatesState = {
    isFirstTime: true,
    setIsFirstTime: async () => undefined,
    coordinates: [],
    setCoordinates: async () => undefined,
    loading: false,
    setLoading: async () => undefined,
}

export const CoordinatesContext = createContext(contextDefaultValues)

const CoordinatesProvider = ({ children }: { children: ReactNode }) => {
    const [coordinates, setCoordinates] = useState<Coordinates>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true)

    return (
        <CoordinatesContext.Provider
            value={{
                isFirstTime,
                setIsFirstTime,
                coordinates,
                setCoordinates,
                loading,
                setLoading,
            }}
        >
            {children}
        </CoordinatesContext.Provider>
    )
}

export const useAuth = () => useContext(CoordinatesContext)

export default CoordinatesProvider
