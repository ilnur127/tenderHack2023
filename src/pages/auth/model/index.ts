import { createEffect, createEvent, createStore, sample } from 'effector'

export type TAuthFormData = {
  login: string
  password: string
}

type UserInfo = {
  role: string
  name: string
  surname: string
}

export const $userInfo = createStore<UserInfo| null>(null)
export const $successAuth = createStore<boolean>(false)

export const authEvent = createEvent<TAuthFormData>()
export const clearUserInfo = createEvent<null>()
export const setUserRole = createEvent<{ role: string } | null>()

const authFx = createEffect(
  async (formData: TAuthFormData): Promise<UserInfo> => {
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
  source: setUserRole,
  fn: (sourceData, clockData) => ({...clockData, ...sourceData}),
  clock: $userInfo,
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
sample({
  clock: clearUserInfo,
  target: $userInfo,
})