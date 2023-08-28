import React from 'react'
import ReactDOM from 'react-dom/client'
import { MainProvider } from './context'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth/AuthProvider'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MainProvider>
          <App />
          <Toaster />
        </MainProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
