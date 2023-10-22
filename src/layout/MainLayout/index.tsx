import { ReactNode } from 'react'

import classes from './index.module.css'
import { ReactComponent as LogoSvg } from './icons/logo.svg'
import { ReactComponent as ErrorsSvg } from './icons/errors.svg'
import { ReactComponent as DashboardsSvg } from './icons/dashboards.svg'
import { ReactComponent as LocationSvg } from './icons/location.svg'
import { ReactComponent as NotificationsSvg } from './icons/notifications.svg'
import { ReactComponent as AdminIconSvg } from './icons/adminIcon.svg'
import { useStore } from 'effector-react'
import { $userInfo, setUserInfo } from '../../pages/auth/model'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  children: ReactNode
}
const MainLayout = ({ children }: Props): JSX.Element => {
  const userInfo = useStore($userInfo)
  const navigate = useNavigate()
  return (
    <div>
      {userInfo && (
        <header className={classes.header}>
          <Link to='/'><LogoSvg /></Link>
          <div className={classes.routes}>
            {[
              { text: 'Ошибки', component: <ErrorsSvg />, link: '/admin' },
              {
                text: 'Дашборд',
                component: <DashboardsSvg />,
                link: '/admin/dashboards',
              },
            ].map((item, i) => (
              <Link key={i} to={item.link} className={classes.routesItem}>
                {item.component}
                <span>{item.text}</span>
              </Link>
            ))}
            <div className={classes.routesItem}>
              <LocationSvg />
              <span>Республика Татарстан</span>
            </div>
          </div>
          <div className={classes.lastSection}>
            <div className={classes.notificationBlock}>
              <NotificationsSvg />
              <div>3</div>
            </div>
            <div className={classes.userInfoBlock}>
              <div>
                <span>Александр Семёнов</span>
                <span>Администратор</span>
                <span onClick={() => {
                  localStorage.setItem('userRole', '');
                  setUserInfo(null)
                  navigate('/auth')
                }} style={{cursor: 'pointer'}}>Выход</span>
              </div>
              <AdminIconSvg />
            </div>
          </div>
        </header>
      )}
      <main className={classes.main}>{children}</main>
    </div>
  )
}

export default MainLayout
