import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useStore } from 'effector-react'

import { $classesErrors } from './model'
import classes from '../../index.module.css'
import { ReactComponent as GoToErrorSvg } from '../../icons/goToError.svg'
import { ReactComponent as ErrorDecisionSvg } from '../../icons/errorDecision.svg'

const ClassesList = (): JSX.Element => {
  const classesErrors = useStore($classesErrors)
  return (
    <div className={classes.errorsList_classes}>
      {classesErrors.length &&
        classesErrors.map((classesError, i) => (
          <div className={classes.errorsList_class} key={i}>
            <h2>{classesError.className}</h2>
            <div className={classes.errorsList_subClasses}>
              {classesError.types.length &&
                classesError.types.map((typeError, i) => (
                  <div className={classes.errorsList_subClass} key={i}>
                    <div className={classes.errorsList_subClass__header}>
                      <h3>{typeError.typeName}</h3>
                      <div></div>
                    </div>
                    <div className={classes.errorsList_group}>
                      {typeError.groups.length &&
                        typeError.groups.filter(groupError => groupError.count).map((groupError) => (
                          <div
                            className={classes.errorsList_group__item}
                            key={groupError.key}
                          >
                            <div
                              className={classes.errorsList_group__itemHeader}
                            >
                              <div>Дата: </div>
                              <div className={classes.errorsList_group__action}>
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
                                <ErrorDecisionSvg fill={groupError.status === 'DECIDED' ? '#264B82' : '#D4DBE6'}/>
                              </div>
                            </div>
                            <div
                              className={classes.errorsList_group__itemContent}
                            >
                              <div>{groupError.title}</div>
                              <div>{groupError.description}</div>
                              <div>{groupError.solution}</div>
                            </div>
                            <GoToErrorSvg
                              className={classes.errorsList_group__itemLink}
                            />
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
