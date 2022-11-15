import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import ResultsPage from './pages/Results'
import 'antd/dist/antd.min.css'
import useToken from './hooks/useToken'

function App() {
    const { token } = useToken()

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/results" element={<ResultsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
