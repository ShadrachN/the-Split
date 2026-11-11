import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { SplitsProvider } from './SplitsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SplitsProvider>
        <App />
      </SplitsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
