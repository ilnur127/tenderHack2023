import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './router'

const router = createBrowserRouter(routes)

const App = (): JSX.Element => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App
