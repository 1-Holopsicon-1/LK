import styled from 'styled-components'

export const Container = styled.div<{
    selected?: boolean
    width?: string
    height?: string
    marginRight?: string
    background?: string
    boxShadow?: string
    border?: boolean
    borderRadius?: number
}>`
    border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius}px` : '50%')};
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ background }) => background ?? 'var(--almostTransparent)'};
    color: var(--text);
    border: ${({ selected, border }) => (selected || border) && '5px solid var(--theme)'};
    outline: ${({ selected }) => selected && '4px solid var(--reallyBlue)'};
    position: relative;

    width: ${({ width }) => width ?? '160px'};
    min-width: ${({ width }) => width ?? '160px'};
    height: ${({ height }) => height ?? '160px'};
    cursor: pointer;
    margin-right: ${({ marginRight }) => marginRight ?? '32px'};
    box-shadow: ${({ boxShadow }) => boxShadow ?? '0'};
    transition: transform 0.2s, box-shadow 0.2s;

    .icon {
        position: absolute;
        bottom: -2px;
        right: -5px;
        background: var(--theme);
        color: var(--text);
        padding: 2px;
        border-radius: 100%;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 12px;
            height: 12px;
        }
    }

    .checkbox {
        position: absolute;
        bottom: -9px;
        right: -9px;
    }

    .name {
        display: flex;
        height: 100%;
        width: 100%;
        color: #fff;
        font-size: ${({ width }) => (width ? parseInt(width) / 50 + 'em' : '3em')};
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    @media (max-width: 1000px) {
        width: ${({ width }) => width ?? '75px'};
        min-width: ${({ width }) => width ?? '75px'};
        height: ${({ height }) => height ?? '75px'};
        margin-right: ${({ marginRight }) => marginRight ?? '15px'};

        .name {
            font-size: ${({ width }) => (width ? parseInt(width) / 50 + 'em' : '1.5em')};
        }
    }
`

export const Img = styled.img<{ round?: boolean }>`
    width: 100%;
    height: 100%;
    border-radius: ${({ round }) => round && '100%'};

    object-fit: cover;
    object-position: center;
`
