import { IInputAreaData } from '@shared/ui/input-area/model'

export const listTeacherMfc = [
    {
        id: 0,
        title: 'Отделение «На Большой Семеновской» ул.Большая Семеновская, 38; ауд. В-207. Тел. (495) 223-05-23, доб. 1105, 1175; crs-bs@mospolytech.ru',
    },
    {
        id: 1,
        title: 'Отделение «На Автозаводской» ул.Автозаводская, 16, ауд. 2315. Тел. (495) 223-05-23, доб. 2256, 2257, 2285, 2240; crs-av@mospolytech.ru',
    },
    {
        id: 2,
        title: 'Отделение «На Павла Корчагина» ул.Павла Корчагина, 22, ауд. 213. Тел. (495) 223-05-23, доб. 3230, 3110, 3114, 3043, 3044, 4054, 4068; crs-pk@mospolytech.ru',
    },
    {
        id: 3,
        title: 'Отделение «На Прянишникова» ул.Прянишникова, 2а, ауд. 1311. Тел. (495) 223-05-23 доб. 4052, 4060, 4056, 4057, 4059, 4061; crs-pryaniki@mospolytech.ru, crs-mikhalka@mospolytech.ru',
    },
]

const hrDepartment = { id: 4, title: 'Отдел кадров' }
const bookkeeping = { id: 5, title: 'Бухгалтерия' }
const mobilizationDepartment = {
    id: 6,
    title: 'Управление мобилизационной подготовки\nг. Москва, ул. Б. Семёновская, д. 38, корп. Н, кабинет 517. Тел.: (495) 223-05-23, доб. 1225',
}

type RequestType = 'kadr' | 'buhg' | 'mob'

const getTeacherSubdivisions = (type?: RequestType): IInputAreaData[] => {
    return [
        {
            title: 'Выберите отделение МФЦ, где желаете получить готовый документ',
            type: 'radio',
            fieldName: 'structural-subdivision',
            value: null,
            editable: true,
            required: true,
            items:
                type === 'kadr'
                    ? [...listTeacherMfc, hrDepartment]
                    : type === 'buhg'
                      ? [...listTeacherMfc, bookkeeping]
                      : type === 'mob'
                        ? [...listTeacherMfc, mobilizationDepartment]
                        : listTeacherMfc,
            specialType: 'personalMethod',
        },
    ]
}

export default getTeacherSubdivisions
