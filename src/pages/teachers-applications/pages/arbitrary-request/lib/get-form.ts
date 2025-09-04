import getBasicFieldsApplicationTeacher from '@pages/teachers-applications/lib/get-basic-fields-application-teacher'

import { UserApplication } from '@shared/api/model'
import { IInputArea } from '@shared/ui/input-area/model'

const getForm = (data: UserApplication): IInputArea => {
    return {
        title: 'Произвольный запрос',
        data: [
            ...getBasicFieldsApplicationTeacher(data),
            {
                title: 'Выберите структурное подразделение для обращения',
                type: 'radio',
                fieldName: 'stuctural_subdivision',
                value: null,
                editable: true,
                required: true,
                items: [
                    {
                        id: 0,
                        title: 'Договорной отдел\nг. Москва, ул. Большая Семеновская, д. 38, ауд. А-303, тел. (495) 223-05-40, (495) 223-05-23 доб. 1549, 1562, 1563, 1564, 1550, 1247; e-mail: oplata@mospolytech.ru',
                    },
                    {
                        id: 1,
                        title: 'Управление мобилизационной подготовки\nг. Москва, ул. Большая Семеновская, д. 38, корп. Н, кабинет 517. Тел.: (495) 223-05-23, доб. 1225',
                    },
                    {
                        id: 2,
                        title: 'Отделение «На Автозаводской» центра по работе со студентами\nул. Автозаводская, 16, ауд. 2315. Тел. (495) 223-05-23, доб. 2256, 2257, 2285, 2240; crs-av@mospolytech.ru',
                    },
                    {
                        id: 3,
                        title: 'Отделение «На Большой Семеновской» центра по работе со студентами\nул. Большая Семеновская, 38; ауд. В-207. Тел. (495) 223-05-23, доб. 1105, 1175; crs-bs@mospolytech.ru',
                    },
                    {
                        id: 4,
                        title: 'Отделение «На Павла Корчагина» центра по работе со студентами\nул. Павла Корчагина, 22, ауд. 213. Тел. (495) 223-05-23, доб. 3230, 3110, 3114, 3043, 3044, 4054, 4068; crs-pk@mospolytech.ru',
                    },
                    {
                        id: 5,
                        title: 'Отделение «На Прянишникова» центра по работе со студентами\nул. Прянишникова, 2а, ауд. 1311. Тел. (495) 223-05-23 доб. 4052, 4060, 4056, 4057, 4059, 4061; crs-pryaniki@mospolytech.ru',
                    },
                    {
                        id: 6,
                        title: 'Профсоюзная организация работников и обучающихся\n107023, г. Москва, ул. Большая Семеновская, д. 38, аудитория В-202. Тел. 495 223-05-31',
                    },
                ],
            },
            {
                title: 'Тематика обращения',
                type: 'textarea',
                fieldName: 'subject_appeal',
                value: '',
                editable: true,
            },
            {
                title: 'Суть обращения',
                type: 'textarea',
                fieldName: 'essence_appeal',
                value: '',
                editable: true,
            },
            {
                title: 'Комментарий к заявке',
                type: 'textarea',
                fieldName: 'commentary',
                value: '',
                editable: true,
            },
        ],
        documents: { files: [], fieldName: 'docs', maxFiles: 4, required: false },
    }
}

export default getForm
