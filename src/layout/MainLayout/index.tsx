import { ReactNode } from 'react'

import classes from './index.module.css'
import { ReactComponent as LogoSvg } from './icons/logo.svg'
import { ReactComponent as ErrorsSvg } from './icons/errors.svg'
import { ReactComponent as DashboardsSvg } from './icons/dashboards.svg'
import { ReactComponent as LocationSvg } from './icons/location.svg'
import { ReactComponent as NotificationsSvg } from './icons/notifications.svg'
import { ReactComponent as AdminIconSvg } from './icons/adminIcon.svg'

type Props = {
  children: ReactNode
}
const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <div>
      <header className={classes.header}>
        <LogoSvg />
        <div className={classes.routes}>
          {[
            { text: 'Ошибки', component: <ErrorsSvg /> },
            { text: 'Дашборд', component: <DashboardsSvg /> },
            { text: 'Республика Татарстан', component: <LocationSvg /> },
          ].map((item, i) => (
            <div key={i}>
              {item.component}
              <span>{item.text}</span>
            </div>
          ))}
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
            </div>
            <AdminIconSvg />
          </div>
        </div>
      </header>
      <main className={classes.main}>{children}</main>
    </div>
  )
}

export default MainLayout
