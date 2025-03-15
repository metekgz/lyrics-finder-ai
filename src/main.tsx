import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TokenProvider } from './context/TokenContext'
import './index.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TokenProvider>
      <App />
    </TokenProvider>
  </React.StrictMode>,
)
