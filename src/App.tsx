import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import ResultsPage from './pages/Results'
import 'antd/dist/antd.min.css'

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
