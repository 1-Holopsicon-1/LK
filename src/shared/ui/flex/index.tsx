import styled from 'styled-components'

type JC = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
type AI = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
type Direction = 'row' | 'column'

const Flex = styled.div<{
    jc?: JC
    ai?: AI
    w?: string
    h?: string
    gap?: string
    d?: Direction
    mw?: string
    mh?: string
    $wrap?: boolean
    p?: string
    m?: string
    position?: string
}>`
    position: ${({ position }) => position};
    width: ${({ w }) => w ?? '100%'};
    max-width: ${({ mw }) => mw};
    height: ${({ h }) => h ?? 'fit-content'};
    max-height: ${({ mh }) => mh};
    gap: ${({ gap }) => gap ?? '0'};
    display: flex;
    align-items: ${({ ai }) => ai ?? 'center'};
    justify-content: ${({ jc }) => jc ?? 'flex-start'};
    flex-direction: ${({ d }) => d ?? 'row'};
    flex-wrap: ${({ $wrap }) => $wrap && 'wrap'};
    padding: ${({ p }) => p};
    margin: ${({ m }) => m};
`

export default Flex
