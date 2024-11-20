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
import { ReportOutlet as CommunityReportOutlet} from '../outlet/Community/ReportOutlet'
import UserProfileOutlet from '../outlet/UserProfileOutlet'
import UserVerifyOutlet from '../outlet/UserVerifyOutlet'
import NewStationOutlet from '../outlet/NewStationOutlet'
import RegisterModule from '../module/RegisterModule'
import Loading from '../component/Loading'
import PNPModule from '../module/PNPModule'
import SelectPNPOutlet from '../outlet/SelectPNPOutlet'
import PNPDashboardOutlet from '../outlet/PNP/PNPDashboardOutlet'
import PNPDispatchedOutlet from '../outlet/PNP/PNPDispatchedOutlet'
import PNPResolvedOutlet from '../outlet/PNP/PNPResolvedOutlet'
import CrimeProvider from '../context/CrimeContext'
import TrackerModule from '../module/TrackerModule'
import RegisterAsCommunityModule from '../module/RegisterAsCommunityModule'
import CommunityModule from '../module/CommunityModule'
import MyReportOutlet from '../outlet/Community/MyReportOutlet'
import { QuickResponseOutlet } from '../outlet/Community/QuickResponseOutlet'


export const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginModule />,
      errorElement: <ErrorComponent />
    },
    {
      path: 'report',
      element: <CrimeProvider><PublicModule /></CrimeProvider>,
      errorElement: <ErrorComponent />
    },
    {
      path: ':code',
      element: <TrackerModule />,
      errorElement: <ErrorComponent />
    },
    {
      path: 'loading',
      element: <Loading />,
      errorElement: <ErrorComponent />
    },
    {
      path: 'register',
      element: <RegisterModule />,
      errorElement: <ErrorComponent />
    },
    {
      path: 'register-as-community',
      element: <RegisterAsCommunityModule />,
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
          path: 'accepted/:id',
          element: <SelectPNPOutlet />,
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
          path: 'station/modify/:id',
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
    {
      path: 'pnp',
      element: <PNPModule />,
      errorElement: <ErrorComponent />,
      children: [
        {
          path: 'dashboard',
          element: <PNPDashboardOutlet />,
          errorElement: <ErrorComponent />,
        },
        {
          path: 'dispatch',
          element: <PNPDispatchedOutlet />,
          errorElement: <ErrorComponent />,
        },
        {
          path: 'resolved',
          element: <PNPResolvedOutlet />,
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
    {
      path: 'community',
      element: <CrimeProvider><CommunityModule /></CrimeProvider>,
      errorElement: <ErrorComponent />,
      children: [
        {
          path: 'my-report',
          element: <MyReportOutlet />,
          errorElement: <ErrorComponent />,
        },
        {
          path: 'report',
          element: <CommunityReportOutlet />,
          errorElement: <ErrorComponent />,
        },
        {
          path: 'quick-response',
          element: <QuickResponseOutlet />,
          errorElement: <ErrorComponent />,
        },
        {
          path: 'profile',
          element: <ProfileOutlet />,
          errorElement: <ErrorComponent />,
        },
        {
          index: true,
          element: <Navigate to={'my-report'} replace/>
        }
      ]
    },
  ])