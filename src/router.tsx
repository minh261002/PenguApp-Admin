import { createBrowserRouter } from 'react-router-dom'

import Layout from '@/layouts/Layout'
import GuardLayout from '@/layouts/GuardLayout'
import Auththentication from '@/middlewares/Authentication'
import NoAuthentication from '@/middlewares/NoAuthentication'
import { lazy, Suspense } from 'react'
import LoadingPage from './layouts/LoadingPage'

const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'))
const UserPage = lazy(() => import('@/pages/user/UserPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const NotFoundError = lazy(() => import('@/pages/errors/not-found-error'))
const UnauthorisedError = lazy(() => import('@/pages/errors/unauthorised-error'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Auththentication>
        <Suspense fallback={<LoadingPage />}>
          <Layout />
        </Suspense>
      </Auththentication>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/user',
        element: <UserPage />
      }
    ]
  },

  {
    path: '/',
    element: (
      <NoAuthentication>
        <Suspense fallback={<LoadingPage />}>
          <GuardLayout />
        </Suspense>
      </NoAuthentication>
    ),
    children: [{ path: '/dang-nhap', element: <LoginPage /> }]
  },

  {
    path: '*',
    element: <NotFoundError />
  },

  {
    path: '/access-denied',
    element: <UnauthorisedError />
  }
])

export default router
