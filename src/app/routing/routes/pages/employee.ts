import { lazy } from 'react'

export const CertificateFromPlaceOfWorkPage = lazy(
    () => import('@pages/teachers-applications/pages/certificate-from-the-place-of-work'),
)
export const CopiesOfDocumentsFromPersonalFilePage = lazy(
    () => import('@pages/teachers-applications/pages/copies-of-documents-from-the-personal-file'),
)
export const ContactInfoActualizationPage = lazy(
    () => import('@pages/teachers-applications/pages/contact-info-actualization'),
)
export const ContactDetails = lazy(() => import('@pages/teachers-applications/pages/contact-details'))
export const ContactDetailsForm = lazy(() => import('@pages/teachers-applications/pages/contact-details/form'))
export const DataVerificationPage = lazy(() => import('@pages/teachers-applications/pages/data-verification'))
export const DownloadAdminFilesPage = lazy(() => import('@pages/download-admin-files'))
export const PersonalNotificationsPage = lazy(() => import('@pages/personal-notifications'))
export const TeachersApplicationsPage = lazy(() => import('@pages/teachers-applications'))
export const EmployeeArbitraryRequestPage = lazy(() => import('@pages/teachers-applications/pages/arbitrary-request'))
export const CertificateOfWorkExperiencePage = lazy(
    () => import('@pages/teachers-applications/pages/certificate-of-work-experience'),
)
export const CertificateTimeParentalLeavePage = lazy(
    () => import('@pages/teachers-applications/pages/certificate-time-parental-leave'),
)
export const ConnectingComputerPage = lazy(() => import('@pages/teachers-applications/pages/connecting-computer'))
export const CopyOfEmploymentRecordPage = lazy(
    () => import('@pages/teachers-applications/pages/copy-of-the-employment-record'),
)
export const CourierPage = lazy(() => import('@pages/teachers-applications/pages/courier'))
export const TeacherPhysicalEducation = lazy(() => import('@pages/teacher-physical-education'))
export const GettingComputerEquipmentPage = lazy(
    () => import('@pages/teachers-applications/pages/getting-computer-equipment'),
)
export const IssuanceOfLicensesPage = lazy(() => import('@pages/teachers-applications/pages/issuance-of-licenses'))
export const NumberOfUnusedVacationDaysPage = lazy(
    () => import('@pages/teachers-applications/pages/number-of-unused-vacation-days'),
)
export const IncreaseAntiplagiatLimits = lazy(
    () => import('@pages/teachers-applications/pages/increase-antiplagiat-limits'),
)

export const EditPhonebookSubdivision = lazy(
    () => import('@pages/teachers-applications/pages/edit-phonebook-subdivision'),
)
export const EditPhonebookInnerPhone = lazy(
    () => import('@pages/teachers-applications/pages/edit-phonebook-inner-phone'),
)
export const EditPhonebookEmail = lazy(() => import('@pages/teachers-applications/pages/edit-phonebook-email'))

export const OtherItServicesPage = lazy(() => import('@pages/teachers-applications/pages/other-it-services'))
export const PaymentForChildCarePage = lazy(() => import('@pages/teachers-applications/pages/payment-for-child-care'))
export const PaymentOfChildBirthAllowancePage = lazy(
    () => import('@pages/teachers-applications/pages/payment-of-child-birth-allowance'),
)
export const PersonaIncomeTaxReferencePage = lazy(
    () => import('@pages/teachers-applications/pages/persona-income-tax-reference'),
)
export const PrinterMaintenancePage = lazy(() => import('@pages/teachers-applications/pages/printer-maintenance'))
export const QuestionPersonalAccountPage = lazy(
    () => import('@pages/teachers-applications/pages/question-personal-account'),
)
export const QuestionSedPage = lazy(() => import('@pages/teachers-applications/pages/question-sed'))
export const VisaCertificatePage = lazy(() => import('@pages/teachers-applications/pages/visa-certificate'))
export const WorkOnTermsOfExternalConcurrencyPage = lazy(
    () => import('@pages/teachers-applications/pages/work-on-the-terms-of-external-concurrency'),
)

export const LivingInResidentialPremises = lazy(
    () => import('@pages/teachers-applications/pages/campus-office/living-in-residential-premises'),
)
export const GuestsAccommodationOnCampus = lazy(
    () => import('@pages/teachers-applications/pages/campus-office/guests-accommodation-on-campus'),
)
export const GuestsPassageToCampus = lazy(
    () => import('@pages/teachers-applications/pages/campus-office/guests-passage-to-campus'),
)
export const Relocation = lazy(() => import('@pages/teachers-applications/pages/campus-office/relocation'))
export const TerminationOfAgreement = lazy(
    () => import('@pages/teachers-applications/pages/campus-office/termination-of-agreement'),
)

export const IssuanceOfPass = lazy(() => import('@pages/teachers-applications/pages/pass-office/issuance-of-pass'))
export const GuestPass = lazy(() => import('@pages/teachers-applications/pages/pass-office/guest-pass'))

export const CertificationAndIssuanceOfDocs = lazy(
    () =>
        import(
            '@pages/teachers-applications/pages/control-and-records-management-office/certification-and-issuance-of-docs'
        ),
)

export const DefermentFromConscription = lazy(
    () => import('@pages/teachers-applications/pages/mobilization-department/deferment-from-conscription'),
)
export const CertifiedCopiesOfMilitaryDocs = lazy(
    () => import('@pages/teachers-applications/pages/mobilization-department/certified-copies-of-military-docs'),
)

export const VacationSchedule = lazy(() => import('@pages/vacation-schedule'))

export const HelpfulInformation = lazy(() => import('@pages/helpful-information'))
export const Allowances = lazy(() => import('@pages/allowances/pages/allowances'))
export const AllowanceInfo = lazy(() => import('@pages/allowances/pages/info'))
export const CreateAllowance = lazy(() => import('@pages/allowances/pages/create-allowance'))
export const Onboarding = lazy(() => import('@pages/onboarding'))
export const Science = lazy(() => import('@pages/science/pages/upload'))
export const ArticleList = lazy(() => import('@pages/science/pages/article-list'))
export const Article = lazy(() => import('@pages/science/pages/article'))
export const ArticleApply = lazy(() => import('@pages/science/pages/article-apply/article-apply'))
export const ArticleApplications = lazy(() => import('@pages/science/pages/article-applications/article-applications'))
export const ArticleApplicationsAdmin = lazy(
    () => import('@pages/science/pages/article-applications-admin/article-applications-admin'),
)
export const Children = lazy(() => import('@pages/children'))
