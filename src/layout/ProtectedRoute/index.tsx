import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { setUserInfo } from '../../pages/auth/model'

const ProtectedRoute = ({ children }: { children: ReactNode }): JSX.Element => {
  const userInfo = localStorage.getItem('userRole')

  setUserInfo(userInfo ? { role: userInfo } : null)

  if (!userInfo) {
    // user is not authenticated
    return <Navigate to="/auth" />
  }

  return <>{children}</>
}

export default ProtectedRoute
