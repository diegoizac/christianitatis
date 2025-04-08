import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initBrowserTools } from './config/browser-tools.config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Inicializa as ferramentas do navegador
initBrowserTools().catch(console.error)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={5000} />
  </React.StrictMode>
)
