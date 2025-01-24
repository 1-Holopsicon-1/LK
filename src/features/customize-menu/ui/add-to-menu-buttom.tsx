import React from 'react'
import { IoIosCheckmarkCircle, IoIosRadioButtonOff } from 'react-icons/io'

import { Button } from '@ui/button'

interface Props {
    chosen: boolean
    onClick: () => void
}

const AddToMenuButton = ({ chosen, onClick }: Props) => {
    return (
        <Button
            minWidth="35px"
            background="transparent"
            icon={chosen ? <IoIosCheckmarkCircle style={{ color: 'var(--blue)' }} /> : <IoIosRadioButtonOff />}
            onClick={onClick}
        />
    )
}

export default AddToMenuButton
