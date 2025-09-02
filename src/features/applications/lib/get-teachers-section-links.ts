import { User } from '@shared/api/model'
import { UNION_ORGANIZATION, isProduction } from '@shared/consts'
import {
    ARBITRARY_REQUEST,
    // BUFFER_EXTRA_HOLIDAY_COLL,
    // BUFFER_HOLIDAY_POSTPONED,
    CERTIFICATE_FROM_PLACE_OF_WORK,
    CERTIFICATE_OF_WORK_EXPERIENCE,
    CERTIFICATE_TIME_PARENTAL_LEAVE,
    CERTIFICATION_AND_ISSUANCE_OF_DOCS,
    CERTIFIED_COPIES_OF_MILITARY_DOCS,
    // CONNECTING_COMPUTER,
    CONTACT_INFO_ACTUALIZATION,
    COPIES_OF_DOCUMENTS_FROM_PERSONAL_FILE,
    COPY_OF_EMPLOYMENT_RECORD,
    COURIER,
    DEFERMENT_FROM_CONSCRIPTION,
    EDIT_PHONEBOOK_EMAIL,
    EDIT_PHONEBOOK_INNER_PHONE,
    EDIT_PHONEBOOK_SUBDIVISION,
    // GETTING_COMPUTER_EQUIPMENT,
    GUESTS_ACCOMMODATION_ON_CAMPUS,
    GUESTS_PASSAGE_TO_CAMPUS,
    GUEST_PASS,
    INCREASE_ANTIPLAGIAT_LIMITS,
    ISSUANCE_OF_LICENSES,
    ISSUANCE_OF_PASS,
    LIVING_IN_RESIDENTIAL_PREMISES,
    MAINTENANCE,
    NUMBER_OF_UNUSED_VACATION_DAYS,
    // OTHER_IT_SERVICES,
    PAYMENT_FOR_CHILD_CARE,
    PAYMENT_OF_CHILD_BIRTH_ALLOWANCE,
    PERSONA_INCOME_TAX_REFERENCE,
    // PRINTER_MAINTENANCE,
    // QUESTION_PERSONAL_ACCOUNT,
    // QUESTION_SED,
    RELOCATION,
    // TECHNICAL_MAINTENANCE,
    TERMINATION_OF_AGREEMENT,
    VISA_CERTIFICATE,
    WORK_ON_TERMS_OF_EXTERNAL_CONCURRENCY,
} from '@shared/routing'

import { Section } from '../ui/molecules/create-application-list'

const getTeachersSectionLinks = (user: User): Section[] => {
    return [
        {
            title: 'Цифровые сервисы',
            links: [
                { link: CERTIFICATE_FROM_PLACE_OF_WORK, title: 'Справка с места работы' },
                { link: VISA_CERTIFICATE, title: 'Справка с места работы для предоставления в визовый центр' },
                { link: NUMBER_OF_UNUSED_VACATION_DAYS, title: 'Справка о количестве неиспользованных дней отпуска' },
                {
                    disabled: isProduction,
                    link: INCREASE_ANTIPLAGIAT_LIMITS,
                    title: 'Запрос на увеличение лимита проверок в системе «Антиплагиат»',
                },
            ],
        },
        {
            title: 'Телефонный справочник',
            links: [
                ...getDivisionHeadLinks(user),
                {
                    link: EDIT_PHONEBOOK_INNER_PHONE,
                    title: 'Запрос на изменение внутреннего телефона',
                },
                {
                    link: EDIT_PHONEBOOK_EMAIL,
                    title: 'Запрос на изменение корпоративной электронной почты',
                },
            ],
        },
        ...getInDevelopmentStaffLinks(),
    ]
}

const getInDevelopmentStaffLinks = () => [
    {
        title: 'Цифровые сервисы (в разработке)',
        disabled: isProduction,
        links: [
            { link: CERTIFICATE_OF_WORK_EXPERIENCE, title: 'Справка о стаже работы' },
            { link: COPY_OF_EMPLOYMENT_RECORD, title: 'Копия трудовой книжки' },
            { link: COPIES_OF_DOCUMENTS_FROM_PERSONAL_FILE, title: 'Копии документов из личного дела' },
            {
                link: WORK_ON_TERMS_OF_EXTERNAL_CONCURRENCY,
                title: 'Справка о работе на условиях внешнего совместительства для внесения стажа в трудовую книжку',
            },
        ],
    },
    {
        disabled: isProduction,
        title: 'Общее',
        links: [{ link: CONTACT_INFO_ACTUALIZATION, title: 'Актуализация контактных данных' }],
    },
    {
        title: 'Обслуживание кампуса и в сфере ИТ',
        links: [{ link: MAINTENANCE, title: 'Обслуживание кампуса и в сфере ИТ' }],
    },
    {
        title: 'Бухгалтерия',
        disabled: isProduction,
        links: [
            { link: PERSONA_INCOME_TAX_REFERENCE, title: 'Справка по форме 2-НДФЛ' },
            {
                link: PAYMENT_OF_CHILD_BIRTH_ALLOWANCE,
                title: 'Справка о выплате (не выплате) единовременного пособия на рождение ребенка',
            },
            {
                link: CERTIFICATE_TIME_PARENTAL_LEAVE,
                title: 'Справка об отпуске по уходу за ребенком до 1,5 и 3 лет',
            },
            {
                link: PAYMENT_FOR_CHILD_CARE,
                title: 'Справка о ежемесячных выплатах сотрудника, находящегося в отпуске по уходу за ребенком (декрет)',
            },
        ],
    },
    {
        title: 'Управление студенческого городка',
        disabled: isProduction,
        links: [
            { link: LIVING_IN_RESIDENTIAL_PREMISES, title: 'Предоставление права проживания в жилом помещении' },
            { link: GUESTS_ACCOMMODATION_ON_CAMPUS, title: 'Временное размещение гостей в студгородке' },
            { link: GUESTS_PASSAGE_TO_CAMPUS, title: 'Проход гостей на территорию студенческого городка' },
            { link: RELOCATION, title: 'Переселение' },
            { link: TERMINATION_OF_AGREEMENT, title: 'Расторжение договора найма жилого помещения' },
        ],
    },
    {
        title: 'Бюро пропусков',
        disabled: isProduction,
        links: [
            { link: ISSUANCE_OF_PASS, title: 'Выдача пропуска (повторная)' },
            { link: GUEST_PASS, title: 'Заказ гостевого пропуска' },
        ],
    },
    {
        title: 'Отдел контроля и делопроизводства',
        disabled: isProduction,
        links: [{ link: CERTIFICATION_AND_ISSUANCE_OF_DOCS, title: 'Заверение и выдача копий внутренних документов' }],
    },
    {
        title: 'Многофункциональный центр',
        disabled: isProduction,
        links: [{ link: ISSUANCE_OF_LICENSES, title: 'Выдача лицензий и свидетельств о государственной аккредитации' }],
    },
    {
        title: 'Экспедиция отдела контроля и делопроизводства',
        disabled: isProduction,
        links: [{ link: COURIER, title: 'Курьер' }],
    },
    {
        title: 'Мобилизационный отдел',
        disabled: isProduction,
        links: [
            {
                link: DEFERMENT_FROM_CONSCRIPTION,
                title: 'Заполнить личную карточку по воинскому учету для получения отсрочки от призыва на военную службу',
            },
            {
                link: CERTIFIED_COPIES_OF_MILITARY_DOCS,
                title: 'Заверенные копии документов по воинскому учету из личного дела',
            },
        ],
    },
    {
        title: 'Прочее',
        disabled: isProduction,
        links: [
            {
                link: ARBITRARY_REQUEST,
                title: 'Произвольный запрос',
            },
            {
                link: UNION_ORGANIZATION,
                title: 'Вступить в Профсоюз',
                isExternalLink: true,
            },
        ],
    },
]

const getTeachersHRSectionLinks = () => {
    return [
        {
            title: '',
            links: [],
        },
    ]
}

const getDivisionHeadLinks = (user: User) =>
    user.head_div && user.head_div.length > 0
        ? [
              {
                  link: EDIT_PHONEBOOK_SUBDIVISION,
                  title: 'Внесение изменений данных подразделения в телефонном справочнике',
              },
          ]
        : []

export { getTeachersSectionLinks, getTeachersHRSectionLinks }
