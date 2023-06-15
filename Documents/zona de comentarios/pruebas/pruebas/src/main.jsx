import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CustomDoctorCard } from "./Especialistas/DoctorCard";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomDoctorCard />
  </React.StrictMode>,
)
