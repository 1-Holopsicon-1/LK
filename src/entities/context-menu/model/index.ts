import React from 'react'

import { createEvent, createStore } from 'effector'
import { useStore } from 'effector-react'
import calcPosition from 'widgets/context-menu/lib/calc-position'

import { Coordinates } from '@ui/types'

type ClickType = 'left-click' | 'right-click' | 'both'

interface ContextMenuStore {
    open: boolean
    type: ClickType
    content: ChildrenType
    position: Coordinates
}

export type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>

const DEFAULT_STORE: ContextMenuStore = {
    open: false,
    content: null,
    type: 'left-click',
    position: { x: 0, y: 0 },
}

const useContextMenu = () => {
    return useStore($contextMenuStore)
}

const open = createEvent<{
    e: ClickEvent
    content: ChildrenType
    height: number
    type?: ClickType
}>()

const close = createEvent()

const changePosition = createEvent<{ position: { x: number; y: number } }>()

const $contextMenuStore = createStore(DEFAULT_STORE)
    .on(open, (oldData, { content, e, height, type = 'left-click' }) => ({
        position: calcPosition(e, 220, height),
        open: true,
        content,
        type,
    }))
    .on(close, (oldData) => ({
        ...oldData,
        open: false,
    }))
    .on(changePosition, (oldData, { position }) => ({
        ...oldData,
        position,
    }))

export const events = {
    open,
    close,
    changePosition,
}

export const selectors = {
    useContextMenu,
}
