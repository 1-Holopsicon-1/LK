import React from 'react'

import styled from 'styled-components'

import { AcadPerformance } from '@shared/api/model/acad-performance'
import Flex from '@shared/ui/flex'
import { Image } from '@shared/ui/image'
import Subtext from '@shared/ui/subtext'
import { Title } from '@shared/ui/title'

const AStudentBackground = styled.div`
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px;
    background: linear-gradient(270deg, #246655, #46b99b, #46a4b9);
    background-size: 600% 600%;

    -webkit-animation: AStudentBackground 10s ease infinite;
    -moz-animation: AStudentBackground 10s ease infinite;
    animation: AStudentBackground 10s ease infinite;

    img {
        filter: drop-shadow(2px 4px 25px black);
    }

    @-webkit-keyframes AStudentBackground {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    @-moz-keyframes AStudentBackground {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    @keyframes AStudentBackground {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`
const AlmostBackground = styled.div`
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px;
    background: linear-gradient(270deg, #243766, #4657b9, #46a4b9, #5d46b9);
    background-size: 800% 800%;

    -webkit-animation: AnimationName 10s ease infinite;
    -moz-animation: AnimationName 10s ease infinite;
    animation: AnimationName 10s ease infinite;

    @-webkit-keyframes AnimationName {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    @-moz-keyframes AnimationName {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    @keyframes AnimationName {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`

type Props = {
    data: AcadPerformance[] | null
}

const analyzeGrades = (data: AcadPerformance[] | null): 'empty' | 'a-student' | 'almost' => {
    if (!data) return 'empty'
    let amountOfNonFives = 0
    let hasBadGrade = false

    for (let index = 0; index < data.length; index++) {
        const { grade } = data[index]
        if (!grade) return 'empty'

        if (grade !== 'Отлично' && grade !== 'Хорошо' && grade !== 'Зачтено') {
            hasBadGrade = true
        }

        if (grade !== 'Зачтено' && grade !== 'Отлично') {
            amountOfNonFives++
        }
    }

    if (hasBadGrade) return 'empty'

    if (amountOfNonFives === 1) return 'almost'
    if (amountOfNonFives > 1) return 'empty'

    return 'a-student'
}

const PerformanceMessage = ({ data }: Props) => {
    const analisys = analyzeGrades(data)

    if (analisys === 'empty') return null

    if (analisys === 'almost')
        return (
            <AlmostBackground>
                <Flex d="column" ai="flex-start" gap="4px">
                    <Title size={3} align="left">
                        Почти отличник
                    </Title>
                    <Subtext fontSize="1rem">В следующий раз повезет</Subtext>
                </Flex>
                <Image
                    src="https://media2.giphy.com/media/Iblv3w6yvj9DTMwCsJ/giphy.gif?cid=6c09b952zc1sjle3291d5t30ls5aqkl8kw1xrr1klyc7h5gk&ep=v1_stickers_related&rid=giphy.gif&ct=g"
                    width="70px"
                    height="70px"
                    loading={false}
                />
            </AlmostBackground>
        )

    return (
        <AStudentBackground>
            <Flex d="column" ai="flex-start" gap="4px">
                <Title size={3} align="left">
                    В этом семестре ты отличник!
                </Title>
                <Subtext fontSize="1rem">Наши поздравления!</Subtext>
            </Flex>
            <Image
                src="https://i.pinimg.com/originals/d3/c6/8a/d3c68aeb6f9ead3e57f80f12d12304b8.gif"
                width="70px"
                height="70px"
                loading={false}
            />
        </AStudentBackground>
    )
}

export default PerformanceMessage
