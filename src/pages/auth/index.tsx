import { useState } from 'react'

import { authEvent, type TAuthFormData } from './model'
import { useNavigate } from 'react-router-dom'

const fields: { name: keyof TAuthFormData; title: string }[] = [
  { name: 'login', title: 'Логин' },
  { name: 'password', title: 'Пароль' },
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
    <div>
      <h1>Вход</h1>
      <form onSubmit={submitForm}>
        {fields.map((item, i) => (
          <div key={i}>
            <label>
              {item.title}
              <input
                type={item.name}
                value={formData[item.name]}
                onChange={(e) =>
                  setFormData((old) => ({
                    ...old,
                    [item.name]: e.target.value,
                  }))
                }
              />
            </label>
          </div>
        ))}
        <button>Войти</button>
      </form>
    </div>
  )
}

export default AuthPage
