import { createEffect, createEvent, createStore, sample } from 'effector'

import data from './json.json'

type TGroup = {
  type: string
  key: string
  title: null
  description: null
  solution: null
  status: string
  count: number
}

type TClassesErrors = {
  className: string
  types: {
    typeName: string
    groups: TGroup[]
  }[]
}[]

export const $classesErrors = createStore<TClassesErrors>([])

export const getClassesErrors = createEvent()

const getClassesErrorsFx = createEffect((): TClassesErrors => {
  return data.data.map((item) => {
    const { classEnum, errorModelList } = item
    const types = {} as Record<string, TGroup[]>
    for (const value of errorModelList) {
      if (types[value.type]) {
        types[value.type].push(value)
      } else {
        types[value.type] = [value]
      }
    }
    return {
      className: classEnum,
      types: Object.entries(types).map((value) => ({
        typeName: value[0],
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
