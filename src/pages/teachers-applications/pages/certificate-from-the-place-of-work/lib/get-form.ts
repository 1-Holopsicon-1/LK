import { IInputArea } from '@ui/input-area/model'
import { UserApplication } from '@api/model'
import { getDefaultSubdivision } from '@pages/teachers-applications/lib/get-default-subdivision'
import { getFormattedSubDivisions } from '@features/applications/lib/get-formatted-subdivisions'

const getForm = (data: UserApplication): IInputArea => {
    return {
        title: 'Справка с места работы',
        data: [
            {
                title: 'Подразделение/должность',
                value: getDefaultSubdivision(data.subdivisions),
                fieldName: 'guid_staff',
                editable: true,
                width: '100',
                required: true,
                type: 'select',
                items: getFormattedSubDivisions(data.subdivisions),
                isSpecificSelect: true,
            },
            {
                title: 'по месту требования',
                type: 'checkbox',
                value: false,
                editable: true,
                fieldName: 'place_of_requirement',
            },
        ],
    }
}

export default getForm
