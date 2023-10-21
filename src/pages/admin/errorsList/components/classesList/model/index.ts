import { createEffect, createEvent, createStore, sample } from 'effector'

import data from './json.json'

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

const getClassesErrorsFx = createEffect((): TClassesErrors => {
  return data.data.map((item) => {
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
