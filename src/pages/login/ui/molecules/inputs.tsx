import React from 'react'

import { Input, Logo, SubmitButton } from '@ui/atoms'
import Checkbox from '@ui/checkbox'
import List from '@ui/list'
import { Message } from '@ui/message'
import Subtext from '@ui/subtext'
import { Title } from '@ui/title'

import useLogin from '@pages/login/hooks/use-login'

import { userModel } from '@entities/user'

import Flex from '@shared/ui/flex'

const Inputs = () => {
    const { loading, error, data } = userModel.selectors.useUser()
    const {
        isSubmitActive,
        password,
        capsLock,
        login,
        showAbiturientMessage,
        handleKeyPress,
        handleSavePassword,
        handleLogin,
        setPassword,
        setLogin,
    } = useLogin()

    return (
        <div className="right" onKeyDown={handleKeyPress}>
            <List
                gap={16}
                horizontalAlign="center"
                position="static"
                verticalAlign="space-between"
                height="100%"
                scroll={false}
            >
                <Logo width="50px" short className="logo second" />
                <Flex jc="space-between">
                    <Title size={3} align="left">
                        Личный кабинет
                    </Title>
                </Flex>
                {showAbiturientMessage && (
                    <Message type={'info'} title="Уважаемые абитуриенты!">
                        <p>
                            Личный кабинет абитуриента находится по ссылке{' '}
                            <a href="https://lk.mospolytech.ru/" target="_blank" rel="noreferrer">
                                <strong>lk.mospolytech.ru</strong>
                            </a>
                        </p>
                    </Message>
                )}
                <List gap={16} scroll={false}>
                    <Title size={4} align="left">
                        Вход
                    </Title>
                    <Subtext>Вход в личный кабинет происходит через единую учетную запись (ЕУЗ)</Subtext>
                    <Message type="failure" visible={!!error}>
                        {error}
                    </Message>
                    <Message type="success" visible={data?.isAuthenticated ?? false}>
                        Вы вошли в аккаунт
                    </Message>
                    <Input value={login} setValue={setLogin} title="Логин" placeholder="Введите логин" />
                    <Input
                        value={password}
                        setValue={setPassword}
                        title="Пароль"
                        placeholder="Введите пароль"
                        type="password"
                        alertMessage={capsLock ? 'Включен Capslock' : undefined}
                    />
                    <Checkbox text="Оставаться в системе" checked={data.savePassword} setChecked={handleSavePassword} />
                </List>
                <SubmitButton
                    text="Вход"
                    action={handleLogin}
                    isLoading={loading}
                    completed={false}
                    setCompleted={() => null}
                    isActive={isSubmitActive}
                />
            </List>
        </div>
    )
}

export default Inputs
