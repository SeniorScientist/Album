import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './styles/index.css'
import './styles/font.css'
import 'react-toastify/dist/ReactToastify.min.css'

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
