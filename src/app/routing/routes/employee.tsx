import React from 'react'
import { Redirect } from 'react-router-dom'

import AllStaff from '@pages/all-staff'
import AllTeachersPage from '@pages/all-teachers'
import DownloadAdminFilesPage from '@pages/download-admin-files'
import PageIsNotReady from '@pages/page-is-not-ready'
import PaymentsPage from '@pages/payments'

import { OLD_LK_URL, isProduction } from '@shared/consts'
import {
    CENTERS_ROUTE,
    DOCUMENT_BLANKS_ROUTE,
    KPI_ADMIN_ROUTE,
    KPI_PPS_ROUTE,
    ONBOARDING,
    OOP_ROUTE,
    ORDERS_ROUTE,
    PPS_VOTE_ROUTE,
    SC_NEWS_ROUTE,
} from '@shared/routing'

import {
    AllowanceInfo,
    Allowances,
    Article,
    ArticleApplications,
    ArticleApplicationsAdmin,
    ArticleApply,
    ArticleList,
    CertificateFromPlaceOfWorkPage,
    CertificateOfWorkExperiencePage,
    CertificateTimeParentalLeavePage,
    CertificationAndIssuanceOfDocs,
    CertifiedCopiesOfMilitaryDocs,
    Children,
    ConnectingComputerPage,
    ContactDetails,
    ContactDetailsForm,
    ContactInfoActualizationPage,
    CopiesOfDocumentsFromPersonalFilePage,
    CopyOfEmploymentRecordPage,
    CourierPage,
    CreateAllowance,
    DataVerificationPage,
    DefermentFromConscription,
    EditPhonebookEmail,
    EditPhonebookInnerPhone,
    EditPhonebookSubdivision,
    EmployeeArbitraryRequestPage,
    GettingComputerEquipmentPage,
    GuestPass,
    GuestsAccommodationOnCampus,
    GuestsPassageToCampus,
    HelpfulInformation,
    IncreaseAntiplagiatLimits,
    IssuanceOfLicensesPage,
    IssuanceOfPass,
    LivingInResidentialPremises,
    NumberOfUnusedVacationDaysPage,
    Onboarding,
    OtherItServicesPage,
    PaymentForChildCarePage,
    PaymentOfChildBirthAllowancePage,
    PersonaIncomeTaxReferencePage,
    PersonalNotificationsPage,
    PhysicalEducationStudent,
    // PrinterMaintenancePage,
    QuestionPersonalAccountPage,
    QuestionSedPage,
    Relocation,
    Science,
    TeacherPhysicalEducation,
    TeachersApplicationsPage,
    TerminationOfAgreement,
    VacationSchedule,
    VisaCertificatePage,
    WorkOnTermsOfExternalConcurrencyPage,
} from './pages'
import { ApplicationRedirect } from './pages/redirect'
import { privateHiddenPages, privatePages } from './private'

export const employeePages = {
    onboarding: Onboarding,
    ...privatePages,

    // свою основную задачу форма выполнила, а дальше ее скрываем. на случай, если надо будет проводить очередную сверку
    'contact-details': isProduction
        ? () => PageIsNotReady({ errorText: 'Страница еще находится в разработке.', isRedirectButtonVisible: false })
        : ContactDetails,
    'contact-details-form': isProduction
        ? () => PageIsNotReady({ errorText: 'Страница еще находится в разработке.', isRedirectButtonVisible: false })
        : ContactDetailsForm,
    'download-agreements': DownloadAdminFilesPage,
    children: Children,
    'electronic-statements': () => {
        React.useEffect(() => {
            window.location.replace(`${OLD_LK_URL}/stats.php?m=items&act=st_list`)
        }, [])

        return null
    },
    'project-activity': () => {
        React.useEffect(() => {
            window.location.replace(`${OLD_LK_URL}/?p=proj_main`)
        }, [])

        return null
    },
    payments: PaymentsPage,
    'pps-contest': () => {
        React.useEffect(() => {
            window.location.replace('https://mospolytech.ru/contest-pps/')
        }, [])

        return null
    },
    'kpi-pps': () => {
        React.useEffect(() => {
            window.location.replace(`${OLD_LK_URL}/?p=${KPI_PPS_ROUTE?.slice(1, KPI_PPS_ROUTE.length)}`)
        }, [])

        return null
    },
    'kpi-admin': () => {
        React.useEffect(() => {
            window.location.replace(`${OLD_LK_URL}/?p=${KPI_ADMIN_ROUTE?.slice(1, KPI_ADMIN_ROUTE.length)}`)
        }, [])

        return null
    },
    'sc-news': () => PageIsNotReady({ oldVersionUrl: SC_NEWS_ROUTE }),
    orders: () => PageIsNotReady({ oldVersionUrl: ORDERS_ROUTE }),
    'document-blanks': () => PageIsNotReady({ oldVersionUrl: DOCUMENT_BLANKS_ROUTE }),
    doclist: PersonalNotificationsPage,
    calendar: VacationSchedule,
    'physical-education': TeacherPhysicalEducation,
    'physical-education-student': PhysicalEducationStudent,
    oop: () => PageIsNotReady({ oldVersionUrl: OOP_ROUTE }),
    centers: () => PageIsNotReady({ oldVersionUrl: CENTERS_ROUTE }),
    info: HelpfulInformation,
    applications: TeachersApplicationsPage,
    allowances: isProduction ? ApplicationRedirect : Allowances,
    'data-verification': DataVerificationPage,
    'all-staff': AllStaff,
    'publication-activity': Science,
    'article-list': ArticleList,
    'article-applications-admin': ArticleApplicationsAdmin,
    'open-publication': () => {
        React.useEffect(() => {
            window.location.replace('https://e.mospolytech.ru/old/index.php?p=exp_concl')
        }, [])

        return null
    },
    'export-control': () => {
        React.useEffect(() => {
            window.location.replace('https://e.mospolytech.ru/old/index.php?p=export_control')
        }, [])

        return null
    },
    // 'generate-schedule': GenerateSchedule,
    kedo: () => {
        React.useEffect(() => {
            window.open('https://kedo.mospolytech.ru')
            window.history.back()
        }, [])
        return null
    },
}

export const employeeHiddenPages = {
    ...privateHiddenPages,
    // remove after mobile version is ready
    // #ASM
    'all-teachers': AllTeachersPage,
    'doclist-type': PersonalNotificationsPage,
    'allowances-role': isProduction ? ApplicationRedirect : Allowances,
    'allowance-info': AllowanceInfo,
    'create-allowances': isProduction ? ApplicationRedirect : CreateAllowance,
    'pps-vote': () => PageIsNotReady({ oldVersionUrl: PPS_VOTE_ROUTE }),
    'issuance-of-licenses-page': isProduction ? ApplicationRedirect : IssuanceOfLicensesPage,
    'getting-computer-equipment': GettingComputerEquipmentPage,
    'connecting-computer': ConnectingComputerPage,
    // 'printer-maintenance': PrinterMaintenancePage,
    'question-sed': QuestionSedPage,
    'question-personal-account': QuestionPersonalAccountPage,
    'other-it-services': OtherItServicesPage,
    'certificate-form-place-of-work': CertificateFromPlaceOfWorkPage,
    'visa-certificate': VisaCertificatePage,
    'certificate-of-work-experience': isProduction ? ApplicationRedirect : CertificateOfWorkExperiencePage,
    'number-of-unused-vacation-days': NumberOfUnusedVacationDaysPage,
    'increase-antiplagiat-limits': isProduction
        ? () => <PageIsNotReady isRedirectButtonVisible={false} errorText={'Сервис находится в разработке'} />
        : IncreaseAntiplagiatLimits,
    'edit-phonebook-subdivision': EditPhonebookSubdivision,
    'edit-phonebook-inner-phone': EditPhonebookInnerPhone,
    'edit-phonebook-email': EditPhonebookEmail,
    'copy-of-employment-record': isProduction ? ApplicationRedirect : CopyOfEmploymentRecordPage,
    'copies-of-documents-from-personal-file': isProduction
        ? ApplicationRedirect
        : CopiesOfDocumentsFromPersonalFilePage,
    'work-on-terms-of-external-concurrency': isProduction ? ApplicationRedirect : WorkOnTermsOfExternalConcurrencyPage,
    'certificate-time-parental-leave': isProduction ? ApplicationRedirect : CertificateTimeParentalLeavePage,
    'arbitrary-request': isProduction ? ApplicationRedirect : EmployeeArbitraryRequestPage,
    courier: isProduction ? ApplicationRedirect : CourierPage,
    'personal-income-tax-reference': isProduction ? ApplicationRedirect : PersonaIncomeTaxReferencePage,
    'payment-of-child-birth-allowance': isProduction ? ApplicationRedirect : PaymentOfChildBirthAllowancePage,
    'payment-for-child-care': isProduction ? ApplicationRedirect : PaymentForChildCarePage,
    'contact-info-actualization': ContactInfoActualizationPage,
    'data-verification': DataVerificationPage,
    'living-in-residential-premises': isProduction ? ApplicationRedirect : LivingInResidentialPremises,
    'guests-accommodation-on-campus': isProduction ? ApplicationRedirect : GuestsAccommodationOnCampus,
    'guests-passage-to-campus': isProduction ? ApplicationRedirect : GuestsPassageToCampus,
    relocation: isProduction ? ApplicationRedirect : Relocation,
    'termination-of-agreement': isProduction ? ApplicationRedirect : TerminationOfAgreement,
    'issuance-of-pass': isProduction ? ApplicationRedirect : IssuanceOfPass,
    'guest-pass': isProduction ? ApplicationRedirect : GuestPass,
    'certification-and-issuance-of-docs': isProduction ? ApplicationRedirect : CertificationAndIssuanceOfDocs,
    'deferment-from-conscription': isProduction ? ApplicationRedirect : DefermentFromConscription,
    'certified-copies-of-military-docs': isProduction ? ApplicationRedirect : CertifiedCopiesOfMilitaryDocs,
    'social-environment': () => {
        window.location.href = 'https://profkommospolytech.ru/'

        return <Redirect to={ONBOARDING} />
    },
    'psychological-help': () => {
        window.location.href =
            'https://mospolytech.ru/studencheskaya-zhizn/medical-help/slujba-psihologicheskoy-pomoschi/'

        return <Redirect to={ONBOARDING} />
    },
    'health-care': () => {
        window.location.href = 'https://mospolytech.ru/studencheskaya-zhizn/medical-help/medicinskaya-slujba/'

        return <Redirect to={ONBOARDING} />
    },
    'wifi-at-the-university': () => {
        window.location.href =
            'https://e.mospolytech.ru/old/storage/files/Instruktsiya_dostupa_k_internetu_v_auditoriyah.pdf'

        return <Redirect to={ONBOARDING} />
    },
    brandbook: () => {
        window.location.href = 'https://mospolytech.ru/ob-universitete/brandbook/'

        return <Redirect to={ONBOARDING} />
    },
    'addresses-and-contacts': () => {
        window.location.href = 'https://mospolytech.ru/ob-universitete/adresa-i-kontakty/'

        return <Redirect to={ONBOARDING} />
    },
    'structure-of-the-university': () => {
        window.location.href =
            'https://mospolytech.ru/ob-universitete/rukovodstvo-i-struktura/strukturnye-podrazdeleniya/'

        return <Redirect to={ONBOARDING} />
    },
    article: Article,
    'article-apply': ArticleApply,
    'article-applications': ArticleApplications,
}
