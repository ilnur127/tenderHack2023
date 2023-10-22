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

export const $errorInfo = createStore<TError | null>(null)

export const getErrorInfo = createEvent<string>()
export const changeErrorInfo = createEvent<
  TFormData & { id: number }
>()

export const getErrorInfoFx = createEffect(
  async (errorId: string): Promise<TError> => {
    const response = await fetch('http://localhost:8080/api/error/' + errorId)
    const data = await response.json()
    return data
  }
)
export const changeErrorInfoFx = createEffect(
  async (
    formData: TFormData & { id: number }
  ): Promise<TError> => {
    const response = await fetch(
      'http://localhost:8080/api/error',
      {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json;charset=utf-8'}),
        body: JSON.stringify(formData),
      }
    )
    const data = await response.json()
    toast("Изменения успешно изменены")
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
