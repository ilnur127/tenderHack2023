import { useEffect } from "react"
// import Select from "react-select/dist/declarations/src/Select"
import { toast } from "react-toastify"

const UserPage = (): JSX.Element => {
  useEffect(() => {
    toast.error('Ошибка')
  }, [])
  return <div>
    <div>
      {/* <Select
        value={selectedFilterData?.category}
        onChange={(option) => changeFilterData('category', option)}
        options={classesList}
        getOptionLabel={(option: TClasses) => option.className}
        getOptionValue={(option: TClasses) => option.classEnum}
        placeholder="Выберете класс"
      />
      <Select />
      <Select /> */}
      Пользователь
    </div>
  </div>
}

export default UserPage
