import React from 'react'
import { FcFile, FcLandscape } from 'react-icons/fc'
import { FiX } from 'react-icons/fi'

import getFileSize from '@shared/lib/get-file-size'
import { Button } from '@shared/ui/button'
import { confirmModel } from '@shared/ui/confirm'
import { FileInputProps } from '@shared/ui/file-input'
import { Image } from '@shared/ui/image'
import { useModal } from '@shared/ui/modal'
import Subtext from '@shared/ui/subtext'

import removeFile from '../../lib/remove-file'
import FileWrapper from './style'

type Props = { file: File } & Pick<FileInputProps, 'files' | 'setFiles'>

const File = ({ file, files, setFiles }: Props) => {
    const { open } = useModal()
    const handleOpenPreview = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, file: File) => {
        e.preventDefault()
        e.stopPropagation()
        const reader = new FileReader()

        reader.onloadend = () => {
            open(<Image src={reader.result as string} loading={false} width={'500px'} height={''} />)
        }

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        confirmModel.events.evokeConfirm({
            message: 'Вы уверены, что хотите удалить файл?',
            onConfirm: () => setFiles(removeFile(e, file.name, files)),
        })

    return (
        <FileWrapper onClick={(e) => e.preventDefault()}>
            <div className="file-body" onClick={(e) => file.type.includes('image') && handleOpenPreview(e, file)}>
                <div className="image-container">{file.type.includes('image') ? <FcLandscape /> : <FcFile />}</div>
                <div className="name-and-size">
                    <b className="file-name">{file.name}</b>
                    <Subtext fontSize="0.7em">{getFileSize(file.size)}</Subtext>
                </div>
            </div>
            <Button icon={<FiX />} height="30px" width="30px" background="transparent" onClick={handleRemove} />
        </FileWrapper>
    )
}

export default File
