import { MainLayout, ProtectedRoute } from '../../layout'
import {
  ErrorsList,
  DashboardsPage,
  AuthPage,
  ErrorDetail,
  MainPage,
  UserPage,
} from '../../pages'

export const routes = [
  {
    path: '/',
    element: (
      <MainLayout>
        <MainPage />
      </MainLayout>
    ),
  },
  {
    path: '/auth',
    element: (
      <MainLayout>
        <AuthPage />
      </MainLayout>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <ErrorsList />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/errors',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <ErrorsList />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/errors/:errorId',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <ErrorDetail />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <ErrorsList />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/dashboards',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <DashboardsPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <UserPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
]
