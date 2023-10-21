import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { format } from 'date-fns'

import { $classesErrors, TClassesError, TGroup } from './model'
import classes from '../../index.module.css'
import { ReactComponent as GoToErrorSvg } from '../../icons/goToError.svg'
import { ReactComponent as ErrorDecisionSvg } from '../../icons/errorDecision.svg'
import { TFilterData } from '../..'

const ClassesList = ({
  selectedFilterData,
}: {
  selectedFilterData: TFilterData
}): JSX.Element => {
  const classesErrors = useStore($classesErrors)

  const filterCategoryFunction = (item: TClassesError) => {
    if (selectedFilterData.category) {
      return item.classEnum === selectedFilterData.category.classEnum
    }
    return true
  }

  const filterDecidedFunction = (groupError: TGroup) => {
    if (selectedFilterData.decided) {
      return groupError.count && !groupError.solution
    }
    return groupError.count
  }

  return (
    <div className={classes.errorsList_classes}>
      {classesErrors.length &&
        classesErrors.filter(filterCategoryFunction).map((classesError, i) => (
          <div className={classes.errorsList_class} key={i}>
            <h2>{classesError.className}</h2>
            <div className={classes.errorsList_subClasses}>
              {classesError.types.length &&
                classesError.types.map((typeError, i) => (
                  <div className={classes.errorsList_subClass} key={i}>
                    <div className={classes.errorsList_subClass__header}>
                      <h3>{typeError.typeDescription}</h3>
                      <div></div>
                    </div>
                    <div className={classes.errorsList_group}>
                      {typeError.groups.length &&
                        typeError.groups
                          .filter(filterDecidedFunction)
                          .map((groupError) => (
                            <div
                              className={classes.errorsList_group__item}
                              key={groupError.id}
                            >
                              <div
                                className={classes.errorsList_group__itemHeader}
                              >
                                <div>
                                  Дата:{' '}
                                  {groupError.lastDate &&
                                    format(
                                      new Date(groupError.lastDate),
                                      'dd.MM.yyyy mm:hh'
                                    )}
                                </div>
                                <div
                                  className={classes.errorsList_group__action}
                                >
                                  <div
                                    className={clsx(
                                      classes.errorsList_group__count,
                                      classes.isNew
                                    )}
                                  >
                                    <div
                                      className={
                                        classes.errorsList_group__cicleNewItem
                                      }
                                    ></div>
                                    <div>
                                      <span>{groupError.count}</span>
                                      <small>повторений</small>
                                    </div>
                                  </div>
                                  <ErrorDecisionSvg
                                    fill={
                                      groupError.solution
                                        ? '#264B82'
                                        : '#D4DBE6'
                                    }
                                  />
                                </div>
                              </div>
                              <div
                                className={
                                  classes.errorsList_group__itemContent
                                }
                              >
                                <div>{groupError.title}</div>
                                <div>{groupError.description}</div>
                                <div>{groupError.solution}</div>
                              </div>
                              <Link to={`/admin/errors/${groupError.id}`}>
                                <GoToErrorSvg
                                  className={classes.errorsList_group__itemLink}
                                />
                              </Link>
                            </div>
                          ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default ClassesList
