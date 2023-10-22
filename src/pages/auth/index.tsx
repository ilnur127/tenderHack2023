import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { authEvent, type TAuthFormData } from './model'
import classes from './index.module.css'

const fields: {
  name: keyof TAuthFormData
  title: string
  placeholder: string
}[] = [
  { name: 'login', title: 'Логин', placeholder: 'Введите логин' },
  { name: 'password', title: 'Пароль', placeholder: 'Введите пароль' },
]

const AuthPage = (): JSX.Element => {
  const [formData, setFormData] = useState<TAuthFormData>({} as TAuthFormData)
  const navigate = useNavigate()
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    authEvent(formData)
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
              value={formData[item.name]}
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
