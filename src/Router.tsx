import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/useAuth'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import ResultsPage from './pages/Results'
import SignupPage from './pages/Signup'

const Router = () => {
    const { isSignedIn } = useAuth()

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
            <Routes>
                {!isSignedIn ? (
                    <>
                        <Route path="/login" element={<Home />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        {' '}
                        <Route path="/map" element={<MapPage />} />
                        <Route path="/results" element={<ResultsPage />} />
                        <Route path="*" element={<Navigate to="/map" />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}

export default Router
