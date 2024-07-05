import { Coordinates } from '@ui/types'
import { createEvent, createStore } from 'effector'
import React from 'react'
import calcPosition from 'widgets/context-menu/lib/calc-position'

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

const open = createEvent<{
    e: ClickEvent
    content: ChildrenType
    height: number
    type?: ClickType
}>()

const close = createEvent()

const changePosition = createEvent<{ position: { x: number; y: number } }>()

const $contextMenu = createStore(DEFAULT_STORE)
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

export const stores = {
    contextMenu: $contextMenu,
}
