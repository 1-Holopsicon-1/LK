import React from 'react'

import NotificationItem from 'widgets/lk-notification-list/ui/notification-item'

import { lkNotificationModel } from '@entities/lk-notifications'

import usePopUpNotifications from './hooks/use-pop-up-notifications'
import { PopUpNotificationsItem, PopUpNotificationsStyled } from './styles'

const PopUpNotifications = () => {
    const { visibleNotifications } = lkNotificationModel.selectors.useLkNotifications()
    const { closing, handleClose } = usePopUpNotifications()
    return (
        <PopUpNotificationsStyled>
            {visibleNotifications.map((notification) => {
                return (
                    <PopUpNotificationsItem
                        onClick={() => {
                            handleClose(notification.id)()
                            notification.onClick?.()
                        }}
                        key={notification.id}
                        open={closing !== notification.id}
                    >
                        <NotificationItem
                            {...notification}
                            fullText={false}
                            maxLetters={19}
                            closeAnimation={false}
                            onClose={() => {
                                handleClose(notification.id)()
                                notification.onClose?.()
                            }}
                        />
                    </PopUpNotificationsItem>
                )
            })}
        </PopUpNotificationsStyled>
    )
}

export default PopUpNotifications
