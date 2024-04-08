import { acadPerformanceModel } from '@entities/acad-performance'
import { adminLinksModel } from '@entities/admin-links'
import { alertModel } from '@entities/alert'
import { applicationsModel } from '@entities/applications'
import { confirmModel } from '@entities/confirm'
import { contactInfoActualizationModel } from '@entities/contact-info-actualization'
import { electronicInteractionModel } from '@entities/electronic-interaction'
import { lkNotificationModel } from '@entities/lk-notifications'
import { messagesModel } from '@entities/messages'
import { personalNotificationModel } from '@entities/notification'
import { paymentsModel } from '@entities/payments'
import { popUpMessageModel } from '@entities/pop-up-message'
import { projectActivitesModel } from '@entities/project-activites'
import { scheduleModel } from '@entities/schedule'
import { superiorRoomModel } from '@entities/superior-room'
import { teacherDateVerificationModel } from '@entities/teacher-data-verification'
import { bufferHolidayPlanningModel } from '@pages/hr-applications/pages/buffer-holiday-planning/model'
import { bufferMedicalExaminationModel } from '@pages/hr-applications/pages/buffer-medical-examination/model'

const stores = [
    acadPerformanceModel,
    adminLinksModel,
    applicationsModel,
    confirmModel,
    electronicInteractionModel,
    messagesModel,
    personalNotificationModel,
    paymentsModel,
    popUpMessageModel,
    projectActivitesModel,
    scheduleModel,
    superiorRoomModel,
    teacherDateVerificationModel,
    contactInfoActualizationModel,
    alertModel,
    lkNotificationModel,
    bufferHolidayPlanningModel,
    bufferMedicalExaminationModel,
]

const clearAllStores = () => {
    stores.forEach((store) => {
        store.events.clearStore()
    })
}

export default clearAllStores
