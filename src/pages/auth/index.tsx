import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { $successAuth, authEvent, type TAuthFormData } from './model'
import classes from './index.module.css'
import { useStore } from 'effector-react'

const fields: {
  name: keyof TAuthFormData
  title: string
  placeholder: string
}[] = [
  { name: 'login', title: 'Логин', placeholder: 'Введите логин' },
  { name: 'password', title: 'Пароль', placeholder: 'Введите пароль' },
]

const AuthPage = (): JSX.Element => {
  const successAuth = useStore($successAuth)
  const [formData, setFormData] = useState<TAuthFormData>({} as TAuthFormData)
  const navigate = useNavigate()

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    authEvent(formData)
  }

  if (successAuth) {
    navigate('/')
  }
  return (
    <div className={classes.authBlock}>
      <h1>Вход</h1>
      <form onSubmit={submitForm}>
        {fields.map((item, i) => (
          <label key={i}>
            {item.title}
            <input
              type={item.name}
              value={formData[item.name] || ''}
              placeholder={item.placeholder}
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  [item.name]: e.target.value,
                }))
              }
            />
          </label>
        ))}
        <button>Войти</button>
      </form>
    </div>
  )
}

export default AuthPage
