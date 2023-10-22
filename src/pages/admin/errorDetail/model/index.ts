import { createEffect, createEvent, createStore, sample } from 'effector'
import { toast } from 'react-toastify'

export type TError = {
  id: number
  classType: string
  classDescription: string
  type: string
  typeDescription: string
  key: string
  title: string | null
  description: string | null
  solution: string | null
  status: string
  dates: string[]
}
export type TFormData = {
  title: string | null
  description: string | null
  solution: string | null
}

type TSendFormData = {
  description: string
  decision: string
}

export const $errorInfo = createStore<TError | null>(null)

export const getErrorInfo = createEvent<string>()
export const changeErrorInfo = createEvent<TFormData & { id: number }>()
export const sendNotiForAllUser = createEvent<TSendFormData>()
export const sendNotiForUser = createEvent<
  TSendFormData & { username: string }
>()

export const getErrorInfoFx = createEffect(
  async (errorId: string): Promise<TError> => {
    const response = await fetch('http://localhost:8080/api/error/' + errorId)
    const data = await response.json()
    return data
  }
)
export const changeErrorInfoFx = createEffect(
  async (formData: TFormData & { id: number }): Promise<TError> => {
    const response = await fetch('http://localhost:8080/api/error', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json;charset=utf-8',
      }),
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    toast('Изменения успешно изменены')
    return data
  }
)
export const sendNotiForAllUserFx = createEffect(
  async (formData: TSendFormData) => {
    const response = await fetch('http://localhost:5000/send-message-all', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json;charset=utf-8',
      }),
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    toast.success('Сообщения отправлены')
    return data
  }
)
export const sendNotiForUserFx = createEffect(
  async (formData: TSendFormData & { username: string }) => {
    const response = await fetch('http://localhost:5000/send-message-one', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json;charset=utf-8',
      }),
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    toast.success('Сообщение отправлено')
    return data
  }
)

sample({
  clock: getErrorInfo,
  target: getErrorInfoFx,
})
sample({
  clock: changeErrorInfo,
  target: changeErrorInfoFx,
})
sample({
  clock: getErrorInfoFx.doneData,
  target: $errorInfo,
})
sample({
  clock: changeErrorInfoFx.doneData,
  target: $errorInfo,
})
sample({
  clock: sendNotiForAllUser,
  target: sendNotiForAllUserFx,
})
sample({
  clock: sendNotiForUser,
  target: sendNotiForUserFx,
})
