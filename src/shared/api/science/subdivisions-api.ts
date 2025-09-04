import { createEffect } from 'effector'

import { $subdivisionApi } from '../config/science-config'
import { Subdivision } from './types'

export const getUserSubdivisionsFx = createEffect({
    handler: async () => {
        const { data } = await $subdivisionApi.get<{ data: Subdivision[] }>(`/`)
        return data.data
    },
})
