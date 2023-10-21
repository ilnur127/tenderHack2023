import { type SingleValue } from 'react-select'

import { useEffect, useState } from 'react'

import FiltersBlock from './components/filtersBlock'
import classes from './index.module.css'
import ClassesList from './components/classesList'
import { getClassesErrors } from './components/classesList/model'

export type TFilterData = {
  category: SingleValue<{ value: string; label: string }>
  decided: boolean
  new: boolean
}

const ErrorsList = (): JSX.Element => {
  const [selectedFilterData, setSelectedFilterData] = useState<TFilterData>(
    {} as TFilterData
  )

  useEffect(() => {
    getClassesErrors()
  })
  return (
    <div className={classes.main}>
      <FiltersBlock
        selectedFilterData={selectedFilterData}
        changeFilterData={(name, value) => {
          setSelectedFilterData((old) => ({ ...old, [name]: value }))
        }}
      />
      <div className={classes.errorsList}>
        <ClassesList />
      </div>
    </div>
  )
}

export default ErrorsList
