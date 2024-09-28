import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LoginModule from './module/LoginModule'
import ErrorComponent from './context/ErrorComponent'
import AppProvider from './context/AppContext'
import PublicModule from './module/PublicModule'
import AdminModule from './module/AdminModule'
import DashboardOutlet from './outlet/DashboardOutlet'
import DispatchOutlet from './outlet/DispatchOutlet'
import DeclinedOutlet from './outlet/DeclinedOutlet'
import AcceptedOutlet from './outlet/AcceptedOutlet'
import UserOutlet from './outlet/UserOutlet'
import StationOutlet from './outlet/StationOutlet'
import ProfileOutlet from './outlet/ProfileOutlet'
import ReportOutlet from './outlet/ReportOutlet'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicModule />,
    errorElement: <ErrorComponent />
  },
  {
    path: 'login',
    element: <LoginModule />,
    errorElement: <ErrorComponent />
  },
  {
    path: 'admin',
    element: <AdminModule />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardOutlet />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'report',
        element: <ReportOutlet />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'dispatch',
        element: <DispatchOutlet />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'declined',
        element: <DeclinedOutlet />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'accepted',
        element: <AcceptedOutlet />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'user',
        element: <UserOutlet />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'station',
        element: <StationOutlet />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'profile',
        element: <ProfileOutlet />,
        errorElement: <ErrorComponent />,
      },
      {
        index: true,
        element: <Navigate to={'dashboard'} replace/>
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <AppProvider>
    <RouterProvider router={router}/>
  </AppProvider>
)
