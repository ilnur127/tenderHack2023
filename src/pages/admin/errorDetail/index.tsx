import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { $errorInfo, TFormData, changeErrorInfo, getErrorInfo } from './model'
import { useStore } from 'effector-react'

import classes from './index.module.css'
import { ReactComponent as BackSvg } from './icons/Back.svg'
import { ReactComponent as PublishedSvg } from './icons/Published.svg'
import { ReactComponent as SavedSvg } from './icons/Saved.svg'
import clsx from 'clsx'
import { format } from 'date-fns'

const fields: { name: keyof TFormData; title: string; placeholder: string }[] =
  [
    {
      name: 'title',
      title: 'Название ошибки',
      placeholder: 'Введите название ошибки',
    },
    {
      name: 'description',
      title: 'Описание ошибки',
      placeholder: 'Введите описание ошибки',
    },
  ]

const ErrorDetail = (): JSX.Element => {
  const { errorId } = useParams()
  const [formData, setFormData] = useState<TFormData>({} as TFormData)

  const errorInfo = useStore($errorInfo)

  useEffect(() => {
    if (errorId) {
      getErrorInfo(errorId)
    }
  }, [])

  useEffect(() => {
    if (errorInfo) {
      const { title, description, solution } = errorInfo
      setFormData({ title, description, solution })
    }
  }, [errorInfo])

  const saveChangedErrorData = () => changeErrorInfo({ ...formData, errorId })

  return (
    <div className={classes.main}>
      {errorInfo && (
        <>
          <div className={classes.indicators}>
            {[errorInfo.classDescription, errorInfo.typeDescription].map(
              (item, i) => (
                <div
                  key={i}
                  className={clsx(
                    classes.indicator,
                    i === 0 ? classes.indicator_class : classes.indicator_type
                  )}
                >
                  {item}
                </div>
              )
            )}
          </div>
          <div className={classes.cardInfo}>
            <h3>Карточка ошибки</h3>
            <div className={classes.cardInfo_content}>
              <div className={classes.cardInfo_content__firstRow}>
                {fields.map((item, i) => (
                  <label key={i}>
                    <span>{item.title}</span>
                    <input
                      value={formData[item.name] || ''}
                      onChange={(e) =>
                        setFormData((old) => ({
                          ...old,
                          [item.name]: e.target.value,
                        }))
                      }
                      placeholder={item.placeholder}
                    />
                  </label>
                ))}
              </div>
              <label>
                <span>Решение ошибки</span>
                <textarea
                  value={formData.solution || ''}
                  onChange={(e) =>
                    setFormData((old) => ({ ...old, solution: e.target.value }))
                  }
                  placeholder="Введите решение ошибки"
                />
              </label>
            </div>
          </div>
          <div className={classes.cardInfo}>
            <h3>Карточка ошибки</h3>
            <div className={clsx(classes.cardInfo_content, classes.dateBlock)}>
              {errorInfo.dates.length &&
                errorInfo.dates.map((item, i) => (
                  <div key={i}>
                    {format(new Date(item), 'dd.MM.yyyy mm:hh')}
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      <div className={classes.actionsBlock}>
        <Link to="/admin/errors" className={classes.actionsBlock_back}>
          <BackSvg />
          <span>Назад</span>
        </Link>
        <button
          className={classes.actionsBlock_save}
          onClick={saveChangedErrorData}
        >
          <SavedSvg />
          <span>Сохранить</span>
        </button>
        <button className={classes.actionsBlock_publishAll}>
          <PublishedSvg />
          <span>Сообщить всем</span>
        </button>
        <div className={classes.actionsBlock_publishCurrent}>
          <h4>Сообщить конкретному пользователю</h4>
          <div>
            <input />
            <button>
              <PublishedSvg fill="#264B82" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorDetail
