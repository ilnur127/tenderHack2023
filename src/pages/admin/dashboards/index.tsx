import { useState } from 'react'
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
  2: '#D4DBE6',
  3: '#E7EEF7',
  4: '#DB2B21',
  5: '#1A1A1A',
  6: '#8C8C8C',
  7: '#0D9B68',
  8: '#167C85',
  9: '#48B8C2',
  10: '#F67319',
  11: '#7F8792',
  12: '#C9D1DF',
}
type TFormData = {startDate: string, endDate: string}

const fields: {name: keyof TFormData, title: string}[] =[
  {name: 'startDate', title: 'Начало периода'},
  {name: 'endDate', title: 'Конец периода'},
]
const DashboardsPage = (): JSX.Element => {
  const statistics = useStore($statistics)
  const isLoading = useStore(getStatisticsFx.pending)
  const [formData, setFormData] = useState<TFormData>({} as TFormData)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div style={{margin: '0px 2.5vw'}}>
      <div className={classes.periods}>
        {
          fields.map((item, i) => (
            <label key={i}>
              {item.title}
              <input type='date' value={formData[item.name]} onChange={(e) => setFormData((old) => ({...old, [item.name]: e.target.value}))}/>
            </label>
          ))
        }
        <button onClick={() => getStatistics(formData)}>Отобразить</button>
      </div>
      {statistics && (
        <>
          <div className={clsx(classes.parentForChart, classes.mainChart)}>
            {statistics.chart1 && (
              <div>
                <div>Статистика ошибок по всех классам</div>
                <Line
                  options={options}
                  data={{
                    labels: dateRange('2023-10-09', '2023-10-16'),
                    datasets: statistics.chart1.map((data, i) => ({
                      label: data.className,
                      data: data.counts,
                      borderColor: color[i+1],
                      backgroundColor: color[i+1],
                    })),
                  }}
                />
              </div>
            )}
            {statistics.chart3 && (
              <div>
                <div>Статистика решенных/не решенных ошибок</div>
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
                            backgroundColor: color[index+1],
                          })
                          arr.push({
                            label: curentItem.className + ' решн. задачи',
                            data: [curentItem.unresolved],
                            backgroundColor: color[index+1],
                          })
                          return arr
                        },
                        []
                      ),
                    ],
                  }}
                />
              </div>
            )}
          </div>
          <div className={clsx(classes.parentForChart, classes.typesChart)}>
            {statistics.chart2 &&
              statistics.chart2.map((type, i) => (
                <div key={i}>
                  <div>{`Статистика для класса ${type.className}`}</div>
                  <Line
                    options={options}
                    data={{
                      labels: dateRange('2023-10-09', '2023-10-16'),
                      datasets: type.data.map((data, i) => ({
                        label: data.typeName,
                        data: data.counts,
                        borderColor: color[i+1],
                        backgroundColor: color[i+1],
                      })),
                    }}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardsPage
