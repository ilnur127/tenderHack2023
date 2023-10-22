import { createEffect, createEvent, createStore, sample } from 'effector'

export type TChart3 = { className: string; solved: number; unresolved: number }
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
  async (params: params): Promise<TStatistics> => {
    const response = await fetch(
      `http://localhost:8080/api/error-statistic`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json;charset=utf-8'}),
        body: JSON.stringify(params)
      }
    )
    const data = await response.json()
    return data
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
