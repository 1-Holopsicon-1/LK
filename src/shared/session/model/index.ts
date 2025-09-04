import { createQuery } from '@farfetched/core'
import axios from 'axios'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { useStore, useUnit } from 'effector-react'
import { reset } from 'patronum'

import { applicationApi, userApi } from '@shared/api'
import { getRoles } from '@shared/api/allowances/allowances-api'
import { forceLogout } from '@shared/api/config/utils'
import { ADName, User, UserToken } from '@shared/api/model'
import { scienceApi } from '@shared/api/science'
import { LoginData } from '@shared/api/user-api'
import { TUTORIAL_HASH, TUTORIAL_PROGRESS, TUTORIAL_PROGRESS_DATE, TUTORIAL_PROGRESS_HASH } from '@shared/consts'
import { BrowserStorageKey } from '@shared/consts/browser-storage-key'

import { clearTokens } from '../lib/clear-tokens'
import createFullName from '../lib/create-full-name'

//  In effector chat core-team describe something like this code (Perhaps a better solution can be found)
const tokenInStorage = localStorage.getItem(BrowserStorageKey.Token) ?? ''

const roleQuery = createQuery({
    handler: getRoles,
})
const $roles = roleQuery.$data.map((jobs) => jobs?.map((job) => job.roles).flat() ?? [])

const $currentUser = createStore<User | null>(null)
const $isAuthenticated = createStore<boolean | null>(!!tokenInStorage?.length)
const $error = createStore<string | null>(null)
const $savePassword = createStore<boolean>(savePasswordInStorage())
const $loginEuz = createStore<string>('')

const authenticated = createEvent()

const getUserTokenFx = createEffect<LoginData, UserToken>(async (params: LoginData) => {
    try {
        const { data } = await userApi.getUserToken(params)

        const form = new FormData()
        form.set('ulogin', params.login)
        form.set('upassword', params.password)
        form.set('auth_action', 'userlogin')

        // set old version site cookies
        try {
            await axios.post('/old', form)
        } catch {}

        clearTokens()

        if (savePasswordInStorage()) {
            localStorage.setItem(BrowserStorageKey.Token, data.token)
            localStorage.setItem(BrowserStorageKey.JWT, data?.jwt ?? '')
            localStorage.setItem(BrowserStorageKey.JWTRefresh, data.jwt_refresh ?? '')
        } else {
            sessionStorage.setItem(BrowserStorageKey.Token, data.token)
            sessionStorage.setItem(BrowserStorageKey.JWT, data?.jwt ?? '')
            localStorage.setItem(BrowserStorageKey.JWTRefresh, data.jwt_refresh ?? '')
        }
        return data
    } catch (e) {
        throw new Error(navigator.onLine ? 'Неверный логин или пароль' : 'Потеряно соединение с интернетом')
    }
})

const getUserFx = createEffect(async (token: Pick<UserToken, 'jwt' | 'token'>) => {
    try {
        const [userResponse, appResponse] = await Promise.all([
            userApi.getUser(token.token),
            applicationApi.getAppData(),
        ])

        const user = userResponse.data.user
        const { name, surname, patronymic } = user

        return {
            ...user,
            guid: appResponse.data.guid_person,
            fullName: createFullName({ name, surname, patronymic }),
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        throw new Error(`Возникла какая-то ошибка: ${(error as Error).message}`)
    }
})

const getLoginEuzFx = createEffect(async (data: ADName): Promise<string> => {
    try {
        const userResponse = await userApi.getADName(data)
        return userResponse.data
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})

const logoutFx = createEffect(() => {
    if (savePasswordInStorage()) {
        localStorage.removeItem(BrowserStorageKey.Token)
        localStorage.removeItem(BrowserStorageKey.JWT)
        localStorage.removeItem(BrowserStorageKey.JWTRefresh)
    } else {
        sessionStorage.removeItem(BrowserStorageKey.Token)
        sessionStorage.removeItem(BrowserStorageKey.JWT)
        sessionStorage.removeItem(BrowserStorageKey.JWTRefresh)
    }
    localStorage.removeItem(TUTORIAL_HASH)
    localStorage.removeItem(TUTORIAL_PROGRESS)
    localStorage.removeItem(TUTORIAL_PROGRESS_DATE)
    localStorage.removeItem(TUTORIAL_PROGRESS_HASH)
})

const changeSavePasswordFunc = (savePassword?: boolean) => {
    const localStorageValue = localStorage.getItem(BrowserStorageKey.SavePassword)
    const value = savePassword ?? JSON.parse(localStorageValue ?? 'true')
    localStorage.setItem(BrowserStorageKey.SavePassword, value.toString())

    return value
}

const login = createEvent<LoginData>()
const logout = createEvent()
const clear = createEvent()
const update = createEvent<{ key: keyof User; value: User[keyof User] }>()
const updateBulk = createEvent<Partial<User>>()
const changeSavePassword = createEvent<{ savePassword: boolean }>()

sample({ clock: login, target: getUserTokenFx })
sample({ clock: getUserTokenFx.doneData, target: getUserFx })
sample({ clock: forceLogout, target: logout })
sample({ clock: logout, target: logoutFx })

!!tokenInStorage && savePasswordInStorage()
    ? getUserFx({ token: tokenInStorage, jwt: localStorage.getItem(BrowserStorageKey.JWT)! })
    : logoutFx()

changeSavePasswordFunc()

const $userGuid = $currentUser.map((currentUser) => currentUser?.guid ?? null)
const $userRole = $currentUser.map((currentUser) => currentUser?.user_status ?? null)

// getUserFx
reset({
    clock: getUserFx,
    target: $error,
})

sample({
    clock: getUserFx.doneData,
    target: $currentUser,
})

reset({
    clock: getUserFx.done,
    target: [$error, $savePassword],
})

sample({
    clock: getUserFx.failData,
    fn: (error) => error.message,
    target: [$error],
})

reset({
    clock: getUserFx.failData,
    target: [$currentUser, $isAuthenticated, $savePassword],
})

sample({
    clock: authenticated,
    source: $userRole,
    filter: (role) => role === 'staff',
    target: roleQuery.start,
})

sample({
    clock: authenticated,
    source: $userRole,
    filter: (role) => role === 'staff',
    target: scienceApi.getRolesQuery.start,
})

//getUserTokenFx
sample({
    clock: getUserTokenFx.doneData,
    fn: ({ token }) => !!token,
    target: [$isAuthenticated],
})

sample({
    clock: getUserTokenFx.failData,
    fn: (error) => error.message,
    target: [$error],
})

sample({
    clock: getUserTokenFx.fail,
    fn: () => null,
    target: [$currentUser, $isAuthenticated],
})

reset({
    clock: getUserTokenFx.fail,
    target: [$savePassword],
})

sample({
    clock: logout,
    fn: () => null,
    target: [$currentUser, $isAuthenticated, $error, roleQuery.reset],
})

reset({
    clock: logout,
    target: [$savePassword],
})

sample({
    clock: changeSavePassword,
    fn: ({ savePassword }) => savePassword,
    target: $savePassword,
})

// getLoginEuzFx
reset({
    clock: getLoginEuzFx,
    target: $error,
})

sample({
    clock: getLoginEuzFx.doneData,
    target: $loginEuz,
})

sample({
    clock: getLoginEuzFx.failData,
    fn: (error) => error.message,
    target: $error,
})

sample({
    clock: update,
    source: $currentUser,
    filter: Boolean,
    fn: (currentUser, newData) => ({ ...currentUser, ...newData }),
    target: $currentUser,
})

sample({
    clock: updateBulk,
    source: $currentUser,
    filter: Boolean,
    fn: (currentUser, newData) => ({ ...currentUser, ...newData }),
    target: $currentUser,
})

reset({
    clock: clear,
    target: $currentUser,
})

sample({
    clock: $currentUser,
    source: $isAuthenticated,
    filter: (isAuth) => !!isAuth,
    target: authenticated,
})

export const selectors = {
    useUser: () => {
        const [user, error, isAuthenticated, savePassword, loginEuz] = useUnit([
            $currentUser,
            $error,
            $isAuthenticated,
            $savePassword,
            $loginEuz,
        ])
        return {
            data: { user, isAuthenticated, savePassword, loginEuz },
            loading: useStore(getUserTokenFx.pending),
            error: error,
        }
    },
}

export const events = {
    login,
    logout,
    changeSavePassword,
    clear,
    update,
    updateBulk,
    authenticated,
}

export const effects = {
    getUserFx,
    getLoginEuzFx,
}

export const stores = {
    isAuthenticated: $isAuthenticated,
    user: $currentUser,
    userGuid: $userGuid,
    userRole: $userRole,
    jobRoles: roleQuery.$data,
    rolesPending: roleQuery.$pending,
    roles: $roles,
}

function savePasswordInStorage() {
    return JSON.parse(localStorage.getItem(BrowserStorageKey.SavePassword) ?? 'true')
}
