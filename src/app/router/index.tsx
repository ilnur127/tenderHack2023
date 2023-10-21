import { ErrorsList, Dashboards } from '../../pages'

export const routes = [
  {
    path: '/admin',
    element: <ErrorsList />,
  },
  {
    path: '/admin/dashboards',
    element: <Dashboards />,
  },
]
