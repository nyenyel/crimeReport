import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider } from 'react-router-dom'
import AppProvider from './context/AppContext'
import { router } from './resource/router'


createRoot(document.getElementById('root')).render(
  <AppProvider>
    <RouterProvider router={router}/>
  </AppProvider>
)
