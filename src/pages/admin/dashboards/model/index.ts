import { createEffect, createEvent, createStore, sample } from 'effector'

import statistics from './statistic.json'

export type TChart3 = { className: string; solved: number, unresolved: number }
type TStatistics = {
  chart1: { className: string; counts: number[] }[] | null
  chart2:
    | { className: string; data: { typeName: string; counts: number[] }[] }[]
    | null
  chart3: TChart3[] | null
}
type params = { startDate: string; endDate: string }
export const $statistics = createStore<TStatistics | null>(null)

export const getStatistics = createEvent<{
  startDate: string
  endDate: string
}>()

export const getStatisticsFx = createEffect(
  ({ startDate, endDate }: params): TStatistics => {
    return statistics
  }
)

sample({
  clock: getStatistics,
  target: getStatisticsFx,
})
sample({
  clock: getStatisticsFx.doneData,
  target: $statistics,
})
