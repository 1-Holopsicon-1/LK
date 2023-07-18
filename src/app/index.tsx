import useTheme from '@shared/lib/hooks/use-theme'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import styled from 'styled-components'
import { ModalProvider } from 'widgets/modal/lib'
import Router from './routers/router'
import usePushNotifications from '@entities/pushes/PushNotificationPermission'

const Background = styled.div`
    background: var(--theme);
    overflow-y: auto;
    height: 100vh;
`

const App = () => {
    useTheme()
    usePushNotifications()

    return (
        <ModalProvider>
            <HashRouter basename="/">
                <Background>
                    <Router />
                </Background>
            </HashRouter>
        </ModalProvider>
    )
}

export default App
