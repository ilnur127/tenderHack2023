import { createEffect, createEvent, createStore, sample } from 'effector'

type TResponseData = {
  classEnum: string
  classDescription: string
  errorModelList: {
    id: number
    type: string
    typeDescription: string
    key: string
    title: string | null
    description: string | null
    solution: string | null
    status: string
    count: number
    lastDate: string
  }[]
}
export type TGroup = {
  id: number
  type: string
  typeDescription: string
  key: string
  title: string | null
  description: string | null
  solution: string | null
  status: string
  count: number
  lastDate: string | null
}

export type TClassesError = {
  className: string
  classEnum: string
  types: {
    typeDescription: string
    groups: TGroup[]
  }[]
}

type TClassesErrors = TClassesError[]

export type TClasses = {
  className: string
  classEnum: string
}

export const $classesErrors = createStore<TClassesErrors>([])
export const $classes = createStore<TClasses[]>([])

export const getClassesErrors = createEvent()

const getClassesErrorsFx = createEffect(async (): Promise<TClassesErrors> => {
  const response = await fetch('http://localhost:8080/api/get-errors')
  const data = await response.json()
  return data.map((item: TResponseData) => {
    const { classDescription, classEnum, errorModelList } = item
    const types = {} as Record<string, TGroup[]>
    for (const value of errorModelList) {
      if (types[value.typeDescription]) {
        types[value.typeDescription].push(value)
      } else {
        types[value.typeDescription] = [value]
      }
    }
    return {
      className: classDescription,
      classEnum,
      types: Object.entries(types).map((value) => ({
        typeDescription: value[0],
        groups: value[1],
      })),
    }
  })
})

sample({
  clock: getClassesErrors,
  target: getClassesErrorsFx,
})

sample({
  clock: getClassesErrorsFx.doneData,
  target: $classesErrors,
})

sample({
  clock: getClassesErrorsFx.doneData,
  fn: (data) =>
    data.map(({ className, classEnum }) => ({ className, classEnum })),
  target: $classes,
})
