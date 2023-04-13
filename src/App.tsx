import React from 'react'
import './App.css'
import 'antd/dist/antd.min.css'
import AuthProvider from './contexts/useAuth'
import Router from './Router'

function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    )
}

export default App
