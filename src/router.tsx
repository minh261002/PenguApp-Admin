import { createBrowserRouter } from 'react-router-dom'

import Layout from '@/layouts/Layout'
import GuardLayout from '@/layouts/GuardLayout'
import Auththentication from '@/middlewares/Authentication'
import NoAuthentication from '@/middlewares/NoAuthentication'
import { NotFoundError, UnauthorisedError } from './pages/errors'
import {
  Dashboard,
  LoginPage,
  PostCataloguePage,
  UserPage,
  EditPostCatalogue,
  CreatePostCatalogue,
  CreateUser,
  EditUser,
  CategoryPage,
  CreateCategory,
  EditCategory
} from '@/pages'

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
      //Category route
      {
        path: '/category',
        element: <CategoryPage />
      },
      {
        path: '/category/create',
        element: <CreateCategory />
      },
      {
        path: '/category/:id/edit',
        element: <EditCategory />
      },
      //Post Catalogue route
      {
        path: '/post-catalogue',
        element: <PostCataloguePage />
      },
      {
        path: '/post-catalogue/create',
        element: <CreatePostCatalogue />
      },
      {
        path: '/post-catalogue/:id/edit',
        element: <EditPostCatalogue />
      },
      //User route
      {
        path: '/user',
        element: <UserPage />
      },
      {
        path: '/user/create',
        element: <CreateUser />
      },
      {
        path: '/user/:id/edit',
        element: <EditUser />
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
