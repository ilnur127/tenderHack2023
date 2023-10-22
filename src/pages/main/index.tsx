import { Navigate } from 'react-router-dom'

const MainPage = (): JSX.Element => {
  const userInfo = localStorage.getItem('userRole')

  if (userInfo) {
    if (userInfo === 'ADMIN') {
      return <Navigate to="/admin" />
    }
    if (userInfo === 'USER') {
      return <Navigate to="/user" />
    }
  }

  return <Navigate to="/auth" />
}

export default MainPage
