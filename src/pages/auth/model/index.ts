import { createEffect, createEvent, createStore, sample } from 'effector'

export type TAuthFormData = {
  login: string
  password: string
}

export const $userInfo = createStore<{ role: string } | null>(null)

export const authEvent = createEvent<TAuthFormData>()
export const setUserInfo = createEvent<{ role: string } | null>()

const authFx = createEffect(
  async (formData: TAuthFormData): Promise<{ role: string }> => {
    const response = await fetch('https://localhost:8080/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    localStorage.setItem('userRole', data.role)
    return data
  }
)

sample({
  clock: setUserInfo,
  target: $userInfo,
})

sample({
  clock: authEvent,
  target: authFx,
})
sample({
  clock: authFx.doneData,
  target: $userInfo,
})
