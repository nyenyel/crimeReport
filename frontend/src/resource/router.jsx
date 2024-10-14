import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LoginModule from '../module/LoginModule'
import ErrorComponent from '../context/ErrorComponent'
import AppProvider from '../context/AppContext'
import PublicModule from '../module/PublicModule'
import AdminModule from '../module/AdminModule'
import DashboardOutlet from '../outlet/DashboardOutlet'
import DispatchOutlet from '../outlet/DispatchOutlet'
import DeclinedOutlet from '../outlet/DeclinedOutlet'
import AcceptedOutlet from '../outlet/AcceptedOutlet'
import UserOutlet from '../outlet/UserOutlet'
import StationOutlet from '../outlet/StationOutlet'
import ProfileOutlet from '../outlet/ProfileOutlet'
import ReportOutlet from '../outlet/ReportOutlet'
import UserProfileOutlet from '../outlet/UserProfileOutlet'
import UserVerifyOutlet from '../outlet/UserVerifyOutlet'
import NewStationOutlet from '../outlet/NewStationOutlet'


export const router = createBrowserRouter([
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
          path: 'user/profile/:id',
          element: <UserProfileOutlet />,
          errorElement: <ErrorComponent />,
        },
        {
          path: 'user/verify/:id',
          element: <UserVerifyOutlet />,
          errorElement: <ErrorComponent />,
        },
        {
          path: 'station',
          element: <StationOutlet />,
          errorElement: <ErrorComponent />,
        },
        {
          path: 'station/new',
          element: <NewStationOutlet />,
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