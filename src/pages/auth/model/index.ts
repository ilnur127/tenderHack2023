import { createEffect, createEvent, createStore, sample } from 'effector'

export type TAuthFormData = {
  login: string
  password: string
}

const p: Record<string, string> = {
  admin: 'admin',
  user: 'user',
}

export const $userInfo = createStore<{ role: string } | null>(null)

export const authEvent = createEvent<TAuthFormData>()
export const setUserInfo = createEvent<{ role: string } | null>()

const authFx = createEffect((formData: TAuthFormData) => {
  localStorage.setItem('userRole', p[formData.password])
  console.log(p[formData.password])
  return { role: p[formData.password] }
})

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
