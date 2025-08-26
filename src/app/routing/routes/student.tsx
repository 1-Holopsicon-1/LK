import React from 'react'

import AllTeachersPage from '@pages/all-teachers'
import FullTimePartTimeFormPage from '@pages/applications/pages/campus-management/full-time-part-time-form'
import ApplicationExitAcademicLeave from '@pages/applications/pages/multifunctional-center/exit-academic-leave'
import MedicalCertificate from '@pages/medical-certificate'
import PaymentsPage from '@pages/payments'

import { isProduction } from '@shared/consts'

import {
    AcadPerformance,
    AcademicLeaveAccommodationPage,
    AccommodationCorrespondenceFormPage,
    AccommodationForGraduatesPage,
    ApplicationExtensionAttestation,
    ApplicationForCertificateOfAttendance,
    ApplicationForFinancialAssistance,
    ApplicationForSocialScrollarship,
    ApplicationForSuperiorRoom,
    ApplicationHolidaysAfterTraining,
    ApplicationIndependentlyDeduction,
    ApplicationPaperCall,
    ApplicationProvisionAcademicLeave,
    ApplicationSocialAgencies,
    ApplicationsPage,
    ArbitraryRequestPage,
    CardRequestPage,
    ChangingPersonalData,
    ClarificationOfPassportDataApplication,
    DormitoryPage,
    FamilyRoomPage,
    FinancialSupport,
    HelpfulInformation,
    IncreasedStateAcademicScholarship,
    MedicalCertificates086,
    MilitaryCopies,
    MilitaryForm4,
    MilitaryForm5,
    MilitaryRegistration,
    MilitaryRegistrationDocuments,
    ParentContacts,
    PaymentRecipient,
    PhysicalEducationStudent,
    PreferentialAccommodationPage,
    ProjectActivitiesPage,
    RegularAccommodationPage,
    RelocationInsideHostelPage,
    RelocationToAnotherHostelPage,
    RestoringTheMagneticPass,
    RetakeForDiploma,
    StateAccreditation,
    StudAccountingPage,
    StudentEmploymentApplicationPage,
    StudentEmploymentPage,
    StudentStatus,
    TaxCertRequestPage,
    TaxCertificatePage,
    TaxCertificatesPage,
    TerminationOfEmploymentContractPage,
} from './pages'
import { ApplicationRedirect } from './pages/redirect'
import { privateHiddenPages, privatePages } from './private'

export const studentPages = {
    // On this position just to make necessary order
    applications: ApplicationsPage,
    ...privatePages,
    payments: PaymentsPage,
    dormitory: DormitoryPage,
    softskills: () => {
        React.useEffect(() => {
            window.location.replace('https://softskills.rsv.ru/')
        }, [])

        return null
    },
    'acad-performance': AcadPerformance,
    'physical-education': PhysicalEducationStudent,
    'project-activity': ProjectActivitiesPage,
    'helpful-information': HelpfulInformation,
    'application-for-superior-room': ApplicationForSuperiorRoom,
    'all-teachers': AllTeachersPage,
    'card-request': CardRequestPage,
}

export const hiddenStudentPages = {
    ...privateHiddenPages,
    'student-employment': StudentEmploymentPage,
    'student-employment-type': StudentEmploymentPage,
    'clarification-of-passport-data': ClarificationOfPassportDataApplication,
    'arbitrary-request': ArbitraryRequestPage,
    'student-employment-app': isProduction ? ApplicationRedirect : StudentEmploymentApplicationPage,
    'social-scollarship': isProduction ? ApplicationRedirect : ApplicationForSocialScrollarship,
    'certificate-of-attendance': ApplicationForCertificateOfAttendance,
    'social-agencies': ApplicationSocialAgencies,
    'paper-call': ApplicationPaperCall,
    'medical-certificate': MedicalCertificate,
    'regular-accommodation': RegularAccommodationPage,
    'full-time-part-time-form': FullTimePartTimeFormPage,
    'accommodation-correspondence-form': AccommodationCorrespondenceFormPage,
    'academic-leave-accommodation': AcademicLeaveAccommodationPage,
    'preferential-accommodation': PreferentialAccommodationPage,
    'family-room': FamilyRoomPage,
    'termination-of-employment-contract': TerminationOfEmploymentContractPage,
    'relocation-inside-hostel': RelocationInsideHostelPage,
    'relocation-to-another-hostel': RelocationToAnotherHostelPage,
    'accommodation-for-graduates': AccommodationForGraduatesPage,
    'payment-recipient': PaymentRecipient,
    'restoring-the-magnetic-pass': RestoringTheMagneticPass,
    'military-registration-documents': MilitaryRegistrationDocuments,
    'military-registration': MilitaryRegistration,
    'military-form-4': MilitaryForm4,
    'military-form-5': MilitaryForm5,
    'military-copies': MilitaryCopies,
    'retake-for-diploma': RetakeForDiploma,
    'increased-state-academic-scholarship': IncreasedStateAcademicScholarship,
    'financial-support': isProduction ? ApplicationRedirect : FinancialSupport,
    'financial-assistance': isProduction ? ApplicationRedirect : ApplicationForFinancialAssistance,
    'changing-personal-data': ChangingPersonalData,
    'student-status': StudentStatus,
    'family-contacts': ParentContacts,
    'medical-certificates-086': MedicalCertificates086,
    'state-accreditation': StateAccreditation,
    'holidays-after-training': ApplicationHolidaysAfterTraining,
    'provision-academic-leave': ApplicationProvisionAcademicLeave,
    'exit-academic-leave': ApplicationExitAcademicLeave,
    'independently-deducted': ApplicationIndependentlyDeduction,
    'extension-attestation': ApplicationExtensionAttestation,
    'tax-certificate': TaxCertificatesPage,
    'tax-certificate-form': TaxCertificatePage,
    'stud-accounting': StudAccountingPage,
    'tax-cert-request': TaxCertRequestPage,
}
