import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { StagesContextProvider } from './context/StagesContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StagesContextProvider>
    <React.StrictMode>
    <App />
  </React.StrictMode>,
  </StagesContextProvider>
  
)
