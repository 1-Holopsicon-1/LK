import React, { ForwardedRef, HTMLInputTypeAttribute, forwardRef } from 'react'
import { FiAlertTriangle, FiEye, FiEyeOff, FiX } from 'react-icons/fi'

import { format } from 'date-fns'
import styled from 'styled-components'

import { Colors } from '@shared/consts'
import { Button } from '@shared/ui/button'
import { INPUT_HEIGHT } from '@shared/ui/input-size'
import { getValueFromSize } from '@shared/ui/slider/lib/get-value-from-size'
import { Title } from '@shared/ui/title'

import { Loading, Message } from '../atoms'
import { Size } from '../types'
import useInput from './hooks/use-input'

const InputWrapper = styled.div<{
    leftIcon: boolean
    isActive: boolean
    inputAppearance: boolean
    width?: string
    minWidth?: string
    maxWidth?: string
    danger?: boolean
    size: Size
}>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: ${({ width }) => width ?? '100%'};
    min-width: ${({ minWidth, width }) => minWidth ?? width};
    max-width: ${({ maxWidth }) => maxWidth};
    pointer-events: ${({ isActive }) => !isActive && 'none'};
    opacity: ${({ isActive }) => !isActive && 0.7};

    .left-icon {
        position: absolute;
        left: 7px;
        top: 55%;
        transform: translateY(-50%);
        color: var(--text);
        opacity: 0.4;
    }

    .message {
        margin-bottom: 5px;
    }

    input {
        border: none;
        color: var(--text);
        outline: none;
        background: ${({ inputAppearance }) => (inputAppearance ? 'var(--theme-1)' : 'transparent')};
        width: 100%;
        padding: 10px;
        font-weight: bold;
        border-radius: 7px;
        padding-left: ${({ leftIcon, inputAppearance }) => (leftIcon ? '30px' : inputAppearance ? '10px' : '0')};
        padding-right: ${({ inputAppearance }) => (!inputAppearance ? '0' : '35px')};
        height: ${getValueFromSize(INPUT_HEIGHT)};
        max-height: ${getValueFromSize(INPUT_HEIGHT)};
        border: ${({ danger }) => danger && `2px solid ${Colors.red.main}`};

        &::placeholder {
            font-weight: 500;
        }

        &:focus-visible {
            outline: ${({ inputAppearance }) => inputAppearance && '4px solid var(--almostTransparentOpposite)'};
        }

        &:focus:not(:focus-visible) {
            outline: none;
        }
    }

    .loading-circle {
        position: absolute;
        bottom: 5px;
        right: 5px;
        width: 25px;
        height: 25px;
    }

    button {
        position: absolute;
        bottom: 5px;
        right: 5px;
        width: 25px;
        height: 25px;
        border-radius: 5px;
        background: ${({ inputAppearance }) => (inputAppearance ? 'var(--search2)' : 'transparent')};
        color: var(--text);
        padding: 0;

        &:active {
            transform: scale(1);
        }

        svg {
            width: 15px;
            height: 15px;
        }
    }
`

type InputType = 'tel' | 'text' | 'number' | 'date' | 'email' | 'password' | HTMLInputTypeAttribute

interface Props {
    value: string
    size?: Size
    setValue: (value: string) => void
    leftIcon?: React.ReactNode
    title?: string
    placeholder?: string
    type?: InputType
    isActive?: boolean
    inputAppearance?: boolean
    required?: boolean
    mask?: boolean
    width?: string
    minWidth?: string
    maxWidth?: string
    autocomplete?: boolean
    danger?: boolean
    alertMessage?: string
    minLength?: number
    maxLength?: number
    minValue?: number | string
    maxValue?: number | string
    loading?: boolean
    customMask?: (value: string, prevValue?: string) => string
    hideCross?: boolean
    stepSize?: number
    onClear?: () => void
}

const Input = forwardRef(function Input(props: Props, ref: ForwardedRef<HTMLInputElement>) {
    const {
        value,
        setValue,
        leftIcon,
        title,
        required,
        width,
        minWidth,
        maxWidth,
        customMask,
        placeholder = 'Введите сюда',
        type = 'text',
        danger: initDanger,
        alertMessage,
        loading = false,
        isActive = true,
        inputAppearance = true,
        mask = false,
        autocomplete = false,
        minValue = undefined,
        maxValue = undefined,
        minLength = undefined,
        maxLength = undefined,
        hideCross = false,
        stepSize = 0.1,
        size = 'middle',
        onClear,
    } = props

    const { inputType, buttonOnClick, danger, handleOnChange, phoneMaskKeyDown } = useInput(
        value,
        setValue,
        type,
        initDanger,
        minValue,
        maxValue,
        customMask,
        mask,
    )

    const formattedValue = value && type === 'date' ? format(new Date(value), 'yyyy-MM-dd') : (value ?? '')

    return (
        <InputWrapper
            leftIcon={!!leftIcon}
            isActive={isActive}
            inputAppearance={inputAppearance}
            width={width}
            danger={danger}
            minWidth={minWidth}
            size={size}
        >
            <Title size={5} align="left" visible={!!title} bottomGap="5px" required={required}>
                {title}
            </Title>
            <Message type="alert" visible={!!alertMessage} icon={<FiAlertTriangle />} title={alertMessage ?? ''} />
            {leftIcon && <span className="left-icon">{leftIcon}</span>}
            <input
                id={placeholder}
                min={minValue}
                max={maxValue}
                minLength={minLength}
                maxLength={maxLength}
                step={stepSize ?? undefined}
                type={inputType}
                placeholder={placeholder}
                value={formattedValue}
                autoComplete={autocomplete ? 'on' : 'off'}
                onKeyDown={(e) => type === 'tel' && phoneMaskKeyDown(e)}
                onChange={handleOnChange}
                required={required}
                readOnly={!isActive}
                ref={ref}
                style={{ maxWidth: maxWidth }}
            />
            {type !== 'password' ? (
                !!value?.length &&
                isActive &&
                (loading ? (
                    <Loading />
                ) : (
                    !hideCross && <Button icon={<FiX />} onClick={onClear ?? (() => setValue(''))} tabIndex={-1} />
                ))
            ) : (
                <Button
                    icon={inputType === 'password' ? <FiEye /> : <FiEyeOff />}
                    tabIndex={-1}
                    onClick={buttonOnClick}
                />
            )}
        </InputWrapper>
    )
})

export default Input
