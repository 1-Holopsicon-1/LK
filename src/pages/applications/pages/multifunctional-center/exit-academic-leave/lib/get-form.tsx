import { UserApplication } from '@shared/api/model'
import { IInputArea } from '@shared/ui/input-area/model'

const AttachmentOptions = [
    { id: 0, title: 'заключение врачебной комиссии медицинской организации' },
    { id: 1, title: 'копия военного билета с отметками о прохождении военной службы' },
]

export const getForm = (dataUserApplication: UserApplication): IInputArea => {
    return {
        title: 'Выход из академического отпуска',
        data: [
            {
                title: 'Телефон',
                type: 'tel',
                mask: true,
                fieldName: 'phone',
                editable: true,
                required: true,
                value: dataUserApplication.phone,
            },
            {
                title: 'Email',
                type: 'email',
                fieldName: 'email',
                value: dataUserApplication.email,
                editable: true,
                required: true,
            },
            {
                title: 'Дата выхода из академического отпуска:',
                type: 'date',
                fieldName: 'time-exit',
                value: '',
                editable: true,
                required: true,
            },
            {
                fieldName: '',
                title: 'Приказ о предоставлении академического отпуска:',
                type: 'text-header',
                visible: true,
                value: 'Данные военного билета',
            },
            {
                title: 'от:',
                type: 'date',
                fieldName: 'order-time',
                value: '',
                editable: true,
                required: false,
            },
            {
                title: '№:',
                fieldName: 'order-number',
                type: 'text',
                value: null,
                editable: true,
                required: false,
            },
            {
                title: 'Приложения:',
                type: 'select',
                fieldName: 'attachments',
                width: '100',
                value: '',
                editable: true,
                required: false,
                items: AttachmentOptions,
            },
            {
                title: 'от:',
                type: 'date',
                fieldName: 'medical-report-time',
                value: '',
                specialType: 'medicalReport',
                editable: true,
                required: true, 
            },
            {
                title: '№:',
                type: 'text',
                fieldName: 'medical-report-number',
                value: null,
                specialType: 'medicalReport',
                editable: true,
                required: true,
            },
            {
                title: 'Количество листов подтверждающих документов:',
                type: 'text',
                fieldName: 'num_sheets',
                value: null,
                specialType: 'medicalReport',
                editable: true,
                required: true,
            },
            {
                title: 'Комментарий к заявке',
                type: 'textarea',
                fieldName: 'comment',
                value: '',
                editable: true,
            },
        ],
        documents: { files: [], fieldName: 'docs', maxFiles: 6, required: false },
    }
}
