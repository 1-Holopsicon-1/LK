import React from 'react'

type Props = {
    words: string[]
}

const DotSeparatedWords = ({ words }: Props) => {
    if (!words.length) {
        return null
    }

    const normalizedWords = words.filter((el) => el.length !== 0)

    return (
        <>
            {normalizedWords.map((word, index) => {
                return word + (index === normalizedWords.length - 1 ? '' : ' • ')
            })}
        </>
    )
}

export default DotSeparatedWords
