import { useEffect } from 'react'
import { useStore } from 'effector-react'
import { $statistics, TChart3, getStatistics, getStatisticsFx } from './model'
import { Line, Bar } from 'react-chartjs-2'
import { format } from 'date-fns'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import classes from './index.module.css'
import clsx from 'clsx'
import { Loader } from '../../../shared'

function dateRange(startDate: string, endDate: string) {
  const dateArray = []
  const currentDate = new Date(startDate)

  while (currentDate < new Date(endDate)) {
    dateArray.push(format(new Date(currentDate), 'dd.MM'))
    currentDate.setUTCDate(currentDate.getUTCDate() + 1)
  }

  return dateArray
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
)
const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
}

const color: Record<string, string> = {
  1: '#264B82',
  2: '#DB2B21',
  3: '#0D9B68',
  4: '#F67319',
}

const DashboardsPage = (): JSX.Element => {
  const statistics = useStore($statistics)
  const isLoading = useStore(getStatisticsFx.pending)

  useEffect(() => {
    getStatistics({
      startDate: '2023-10-09',
      endDate: '2023-10-16',
    })
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <div></div>
      {statistics && (
        <>
          <div className={clsx(classes.parentForChart, classes.mainChart)}>
            {statistics.chart1 && (
              <Line
                options={options}
                data={{
                  labels: dateRange('2023-10-09', '2023-10-16'),
                  datasets: statistics.chart1.map((data, i) => ({
                    label: data.className,
                    data: data.counts,
                    borderColor: color[i],
                    backgroundColor: color[i],
                  })),
                }}
              />
            )}
            {statistics.chart3 && (
              <Bar
                options={options}
                data={{
                  labels: [''],
                  datasets: [
                    ...statistics.chart3.reduce(
                      (
                        arr: {
                          label: string
                          data: number[]
                          backgroundColor: string
                        }[],
                        curentItem: TChart3,
                        index: number
                      ) => {
                        arr.push({
                          label: curentItem.className + ' решн. задачи',
                          data: [curentItem.solved],
                          backgroundColor: color[index],
                        })
                        arr.push({
                          label: curentItem.className + ' решн. задачи',
                          data: [curentItem.unresolved],
                          backgroundColor: color[index],
                        })
                        return arr
                      },
                      []
                    ),
                  ],
                }}
              />
            )}
          </div>
          <div className={clsx(classes.parentForChart, classes.typesChart)}>
            {statistics.chart2 &&
              statistics.chart2.map((type, i) => (
                <Line
                  key={i}
                  options={options}
                  data={{
                    labels: dateRange('2023-10-09', '2023-10-16'),
                    datasets: type.data.map((data, i) => ({
                      label: data.typeName,
                      data: data.counts,
                      borderColor: color[i],
                      backgroundColor: color[i],
                    })),
                  }}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardsPage
