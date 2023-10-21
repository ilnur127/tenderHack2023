import Select, { SingleValue } from 'react-select'
import Switch from 'react-switch'

import type { TFilterData } from '../..'
import classes from '../../index.module.css'
import { ReactComponent as DecisionSvg } from '../../icons/Decision.svg'
import { ReactComponent as NewSvg } from '../../icons/new.svg'
import { ReactComponent as ClassSvg } from '../../icons/Class.svg'

const switcherObject = {
  decided: {
    text: 'Ошибки без решения',
    icon: <DecisionSvg />,
  },
  new: {
    text: 'Новое повторение ошибки',
    icon: <NewSvg />,
  },
}

const switchers: Array<{ name: keyof typeof switcherObject }> = [
  { name: 'decided' },
  { name: 'new' },
]

type SwitcherComponentProps = {
  name: keyof typeof switcherObject
  changeSwitcherValue: (
    name: keyof typeof switcherObject,
    value: boolean
  ) => void
  selectedFilterData: TFilterData
}

const SwitcherComponent = ({
  name,
  changeSwitcherValue,
  selectedFilterData,
}: SwitcherComponentProps) => (
  <div className={classes.filtersBlock_content__switcher}>
    <Switch
      onChange={(checked) => changeSwitcherValue(name, checked)}
      checked={selectedFilterData[name]}
      uncheckedIcon={false}
      checkedIcon={false}
      onColor="#DB2B21"
      offColor="#D4DBE6"
    />
    <div className={classes.filtersBlock_content__switcherInfo}>
      {switcherObject[name].icon}
      {switcherObject[name].text}
    </div>
  </div>
)

type Props = {
  selectedFilterData: TFilterData
  changeFilterData: (
    name: keyof TFilterData,
    value: boolean | SingleValue<{ value: string; label: string }>
  ) => void
}

const FiltersBlock = ({
  selectedFilterData,
  changeFilterData,
}: Props): JSX.Element => (
  <div className={classes.filtersBlock}>
    <div className={classes.filtersBlock_content}>
      <h3>Настройки отображения</h3>
      <div className={classes.filtersBlock_content__class}>
        <div className={classes.filtersBlock_content__classLabel}>
          <ClassSvg />
          <span>Классы ошибок</span>
        </div>
        <Select
          value={selectedFilterData?.category}
          onChange={(option) => changeFilterData('category', option)}
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ]}
          placeholder="Выберете класс"
        />
      </div>
      <div className={classes.filtersBlock_content__switchers}>
        {switchers.map(({ name }, i) => (
          <SwitcherComponent
            key={i}
            name={name}
            selectedFilterData={selectedFilterData}
            changeSwitcherValue={(name, value) => {
              changeFilterData(name, value)
            }}
          />
        ))}
      </div>
    </div>
  </div>
)

export default FiltersBlock
