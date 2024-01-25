// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './context/authContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
