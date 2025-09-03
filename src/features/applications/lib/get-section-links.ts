import { Section } from '@features/applications/ui/molecules/create-application-list'

import { StudentAccount } from '@shared/api/model'
import { RECEPTION_COMMISSION, UNION_ORGANIZATION, isProduction } from '@shared/consts'
import {
    ACADEMIC_LEAVE_ACCOMMODATION,
    ACCOMMODATION_CORRESPONDENCE_FORM,
    ACCOMMODATION_FOR_GRADUATES,
    ARBITRARY_REQUEST_ROUTE,
    CERTIFICATE_OF_ATTENDANCE,
    CHANGING_PERSONAL_DATA,
    CLARIFICATION_OF_PASSPORT_DATA_ROUTE,
    EXIT_ACADEMIC_LEAVE,
    EXTENSION_ATTESTATION,
    FAMILY_CONTACTS,
    FAMILY_ROOM,
    FINANCIAL_ASSISTANCE,
    FINANCIAL_SUPPORT,
    FULL_TIME_PART_TIME_FORM,
    HOLIDAYS_AFTER_TRAINING,
    INCREASED_STATE_ACADEMIC_SCHOLARSHIP,
    INDEPENDENTLY_DEDUCTED,
    MEDICAL_CERTIFICATE,
    MEDICAL_CERTIFICATES_086,
    MILITARY_COPIES,
    MILITARY_FORM_4,
    MILITARY_FORM_5,
    MILITARY_REGISTRATION,
    MILITARY_REGISTRATION_DOCUMENTS,
    PAPER_CALL,
    PAYMENT_RECIPIENT,
    PREFERENTIAL_ACCOMMODATION,
    PROVISION_ACADEMIC_LEAVE,
    REGULAR_ACCOMMODATION,
    RELOCATION_INSIDE_HOSTEL,
    RELOCATION_TO_ANOTHER_HOSTEL,
    RESTORING_THE_MAGNETIC_PASS,
    RETAKE_FOR_DIPLOMA,
    SOCIAL_AGENCIES,
    SOCIAL_SCOLLARSHIP,
    STATE_ACCREDITATION,
    STUDENT_EMPLOYMENT_APPLICATION_ROUTE,
    STUDENT_STATUS,
    STUD_ACCOUNTING,
    TECHNICAL_MAINTENANCE,
    TERMINATION_OF_EMPLOYMENT_CONTRACT,
} from '@shared/routing'

const getSectionLinks = ({ studentFinance }: { studentFinance: StudentAccount['finance'] }): Section[] => {
    const additionalHeaderClosedService = isProduction ? ' (Сервис временно недоступен)' : ''
    return [
        {
            title: 'Многофункциональный центр',
            links: [
                {
                    link: STUD_ACCOUNTING,
                    disabled: studentFinance !== 'Бюджетная',
                    title: 'Справка о выплате стипендии и иные выплаты (из бухгалтерии)',
                },
                {
                    link: CERTIFICATE_OF_ATTENDANCE,
                    title: 'Справка о прослушанных дисциплинах за период обучения (справка об обучении)',
                },
                {
                    link: STUDENT_STATUS,
                    title: 'Справка о прохождении обучения в университете (о статусе обучающегося) по месту требования',
                },
                { link: SOCIAL_AGENCIES, title: 'Справка в социальные учреждения (Пенсионный фонд, УСЗН и пр.)' },
                { link: PAPER_CALL, title: 'Справка-вызов' },
                { link: RETAKE_FOR_DIPLOMA, title: 'Заявление на пересдачу для получения диплома с отличием' },
                { link: CHANGING_PERSONAL_DATA, title: 'Запрос на изменение персональных данных' },
                { link: RESTORING_THE_MAGNETIC_PASS, title: 'Запрос на восстановление магнитного пропуска' },
                { link: CLARIFICATION_OF_PASSPORT_DATA_ROUTE, title: 'Уточнение паспортных данных' },
                { link: STATE_ACCREDITATION, title: 'Выдача лицензий и свидетельств о государственной аккредитации' },
                { link: HOLIDAYS_AFTER_TRAINING, title: 'Предоставление каникул в связи с окончанием университета' },
                { link: PROVISION_ACADEMIC_LEAVE, title: 'Предоставление академического отпуска' },
                { link: EXIT_ACADEMIC_LEAVE, title: 'Выход из академического отпуска' },
                { link: INDEPENDENTLY_DEDUCTED, title: 'Отчисление по инициативе обучающегося' },
                { link: EXTENSION_ATTESTATION, title: 'Продление промежуточной аттестации или ГИА' },
            ],
        },
        {
            title: 'Управление студенческим городком',
            links: [
                {
                    link: MEDICAL_CERTIFICATE,
                    title: 'Предоставление медицинских справок для проживающих в общежитии',
                },
                {
                    link: REGULAR_ACCOMMODATION,
                    title: 'Предоставление права проживания (очная форма)',
                    exceptionalFormEducationList: ['Очно-заочная', 'Заочная'],
                },
                {
                    link: FULL_TIME_PART_TIME_FORM,
                    title: 'Предоставление права проживания (очно-заочная форма)',
                    exceptionalFormEducationList: ['Очная', 'Заочная'],
                },
                {
                    link: ACCOMMODATION_CORRESPONDENCE_FORM,
                    title: 'Предоставление права проживания (заочная форма)',
                    exceptionalFormEducationList: ['Очная', 'Очно-заочная'],
                },
                {
                    link: PREFERENTIAL_ACCOMMODATION,
                    title: 'Предоставление права проживания льготной категории граждан',
                },
                {
                    link: ACADEMIC_LEAVE_ACCOMMODATION,
                    title: 'Предоставление права проживания в период академического отпуска',
                    exceptionalFormEducationList: ['Очно-заочная', 'Заочная'],
                },
                {
                    link: FAMILY_ROOM,
                    title: 'Предоставление права проживания в семейной комнате',
                    exceptionalFormEducationList: ['Очно-заочная', 'Заочная'],
                },
                {
                    link: RELOCATION_INSIDE_HOSTEL,
                    title: 'Переселение внутри общежития',
                    exceptionalFormEducationList: ['Заочная'],
                },
                {
                    link: RELOCATION_TO_ANOTHER_HOSTEL,
                    title: 'Переселение в другое общежитие',
                    exceptionalFormEducationList: ['Заочная'],
                },
                {
                    link: TERMINATION_OF_EMPLOYMENT_CONTRACT,
                    title: 'Расторжение договора найма',
                },
                {
                    link: ACCOMMODATION_FOR_GRADUATES,
                    title: 'Предоставление права проживания в период каникул',
                },
            ],
        },
        {
            title: 'Профсоюзная организация',
            links: [
                {
                    link: UNION_ORGANIZATION,
                    title: 'Вступить в Профсоюз',
                    isExternalLink: true,
                    isOpenInNewWindow: true,
                },
                {
                    link: FINANCIAL_SUPPORT,
                    title: 'Оформить материальную поддержку остронуждающимся студентам (Дотацию)',
                },
                { link: FINANCIAL_ASSISTANCE, title: 'Заявка на материальную помощь' },
                { link: SOCIAL_SCOLLARSHIP, title: 'Оформить социальную стипендию' },
                {
                    link: INCREASED_STATE_ACADEMIC_SCHOLARSHIP,
                    title:
                        studentFinance === 'С оплатой обучения'
                            ? 'Конкурс на назначение стипендии Московского Политеха'
                            : 'Конкурс на назначение повышенной государственной академической стипендии',
                    exceptionalFormEducationList: ['Очно-заочная', 'Заочная'],
                    exceptionalDegreeLevelList: ['Аспирантура'],
                },
            ],
        },
        {
            title: 'Управление мобилизационной подготовки',
            links: [
                { link: MILITARY_REGISTRATION_DOCUMENTS, title: 'Отправить документы воинского учета' },
                {
                    link: MILITARY_REGISTRATION,
                    title: 'Заполнить личную карточку обучающегося по воинскому учету для получения отсрочки от призыва на военную службу (форма 10)',
                },
                {
                    link: MILITARY_FORM_4,
                    title: 'Заказать справку об обучении для студентов в военкомат (форма 4)',
                    description: 'Доступна после заполнения формы № 10',
                },
                {
                    link: MILITARY_FORM_5,
                    title: 'Заказать справку об обучении для аспирантов в военкомат (форма 5)',
                    description: 'Доступна после заполнения формы № 10',
                },
                {
                    link: MILITARY_COPIES,
                    title: 'Заверенные копии документов по воинскому учету из личного дела',
                },
            ],
        },
        {
            title: 'Отдел платных образовательных услуг' + additionalHeaderClosedService,
            disabled: isProduction,
            links: [
                { link: PAYMENT_RECIPIENT, title: 'Оформить дополнительное соглашение к договору об обучении' },
                { link: PAYMENT_RECIPIENT, title: 'Отправить квитанцию об оплате обучения или пени' },
            ],
        },
        {
            title: 'Приемная комиссия',
            links: [
                {
                    link: RECEPTION_COMMISSION,
                    isExternalLink: true,
                    title: 'Изменение условий обучения (направление подготовки (специальность), форма), в том числе перевод с платного обучения на бесплатное',
                },
            ],
        },
        {
            title: 'Прочее',
            links: [
                {
                    link: MEDICAL_CERTIFICATES_086,
                    title: 'Предоставление справок о группе здоровья',
                },
                {
                    link: FAMILY_CONTACTS,
                    title: 'Контактные данные родителей',
                },
                {
                    link: TECHNICAL_MAINTENANCE,
                    title: 'Техническая эксплуатация',
                },
                {
                    link: ARBITRARY_REQUEST_ROUTE,
                    title: 'Произвольный запрос',
                },
            ],
        },
        {
            title: 'Прочее (в разработке)',
            disabled: isProduction,
            links: [
                {
                    link: STUDENT_EMPLOYMENT_APPLICATION_ROUTE,
                    title: 'Трудоустройство студентов',
                },
            ],
        },
    ]
}

export default getSectionLinks
