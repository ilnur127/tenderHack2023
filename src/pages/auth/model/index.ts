import { createEffect, createEvent, createStore, sample } from 'effector'

export type TAuthFormData = {
  login: string
  password: string
}

export const $userInfo = createStore<{ role: string } | null>(null)
export const $successAuth = createStore<boolean>(false)

export const authEvent = createEvent<TAuthFormData>()
export const setUserInfo = createEvent<{ role: string } | null>()

const authFx = createEffect(
  async (formData: TAuthFormData): Promise<{ role: string }> => {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json;charset=utf-8'}),
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
sample({
  clock: authFx.doneData,
  fn: () => true,
  target: $successAuth,
})
