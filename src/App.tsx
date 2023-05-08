import React from 'react'
import './App.css'
import 'antd/dist/antd.min.css'
import AuthProvider from './contexts/useAuth'
import Router from './Router'
import LoadingProvider from './contexts/useLoadingImages'
import CoordinatesProvider from './contexts/useCoordinates'
import { SnackbarProvider } from 'notistack'

function App() {
    return (
        <AuthProvider>
            <LoadingProvider>
                <CoordinatesProvider>
                    <SnackbarProvider
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                        style={{ display: 'flex', alignItems: 'start' }}
                        autoHideDuration={1000}
                    >
                        <Router />
                    </SnackbarProvider>
                </CoordinatesProvider>
            </LoadingProvider>
        </AuthProvider>
    )
}

export default App
