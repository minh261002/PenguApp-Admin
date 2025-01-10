import { createBrowserRouter } from 'react-router-dom'

import Layout from '@/layouts/Layout'
import GuardLayout from '@/layouts/GuardLayout'
import Auththentication from '@/middlewares/Authentication'
import NoAuthentication from '@/middlewares/NoAuthentication'
import { NotFoundError, UnauthorisedError } from './pages/errors'
import { Dashboard, LoginPage, UserPage } from './pages'
import CreateUser from './pages/user/CreateUser'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Auththentication>
        <Layout />
      </Auththentication>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      //User route
      {
        path: '/user',
        element: <UserPage />
      },
      {
        path: '/user/create',
        element: <CreateUser />
      }
    ]
  },

  {
    path: '/',
    element: (
      <NoAuthentication>
        <GuardLayout />
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
