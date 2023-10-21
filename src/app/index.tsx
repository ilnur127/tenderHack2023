import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './router'
import { MainLayout } from '../layout'

const router = createBrowserRouter(routes)

const App = (): JSX.Element => {
  return (
    <React.StrictMode>
      <MainLayout>
        <RouterProvider router={router} />
      </MainLayout>
    </React.StrictMode>
  )
}

export default App
