import { Buildings } from './get-cabinet-mask'

const groupMask = (value: string, prevValue?: string) => {
    if (value.length > 8) return value.substring(0, 8)
    if (value.length === 3 && prevValue?.length === 2) return value + '-'
    if (value.length === 3 && prevValue?.length === 4) return value.substring(0, 2)
    return value
}

const phoneMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const russianNumberBeginnings = ['7', '8', '9']
    const selectionStart = e.target.selectionStart
    let phoneInput = e.target.value.replace(/\D/g, '')
    let formattedPhone = ''

    if (!phoneInput.length) return ''

    if (e.target.value.length !== selectionStart) {
        const inputData = (e.nativeEvent as InputEvent).data
        if (inputData && typeof inputData === 'string' && /\D/g.test(inputData)) {
            return phoneInput
        }
        return e.target.value
    }

    // В маске телефона вводить только с +7
    // 1С дурит, если номер с 8ки
    // На иностранные пофиг                 (С) Хуснулина ДР

    // if (russianNumberBeginnings.indexOf(phoneInput[0]) > -1) {
    // russian number
    if (phoneInput[0] !== '7') phoneInput = '7' + phoneInput
    // const firstSymbols = phoneInput[0] === '8' ? '8' : '+7'
    const firstSymbols = '+7'
    formattedPhone = firstSymbols + ' '
    if (!!phoneInput.length) {
        formattedPhone += '(' + phoneInput.substring(1, 4)
    }
    if (phoneInput.length >= 5) {
        formattedPhone += ') ' + phoneInput.substring(4, 7)
    }
    if (phoneInput.length >= 8) {
        formattedPhone += '-' + phoneInput.substring(7, 9)
    }
    if (phoneInput.length >= 10) {
        formattedPhone += '-' + phoneInput.substring(9, 11)
    }
    // } else {
    //     // not russian number
    //     formattedPhone = `+${phoneInput.substring(0, 16)}`
    // }

    return formattedPhone
}

const applyGeneralCabinetMask = (
    value: string,
    formattedValue: string,
    room: string,
    subroom: RegExpMatchArray | null,
    type: Buildings,
    maxRoomLength = 4,
) => {
    formattedValue += room.substring(0, maxRoomLength)
    if (!subroom || !subroom[0]?.toLowerCase()?.match(/[а-я]/)) return formattedValue
    formattedValue += subroom[0].toLowerCase()
    return formattedValue.substring(0, type.length + maxRoomLength + 2)
}

const cabinetMask = (value: string, type: Buildings) => {
    const room = value.replace(/\D/g, '')
    const subroom = value.match(/(?<=\d)[а-яА-Я]/)
    let formattedValue = type + ' '

    switch (type) {
        case 'БС':
            const building = value.substring(3).match(/^[а-яА-Я]{1,2}/)
            if (!building || !building[0]?.toUpperCase()?.match(/^(А|Б|В|НД?D?)$/)) return formattedValue
            formattedValue += building[0].toUpperCase()
            if (
                building[0].length === 1
                    ? value[3] && !value[5] && value[4] === ' '
                    : value[4] && !value[6] && value[5] === ' '
            )
                return formattedValue + ' '
            if (room.length > 0) formattedValue += ' '
            formattedValue += room.substring(0, 3)
            if (!subroom || !subroom[0]?.toLowerCase()?.match(/[а-я]/)) return formattedValue
            formattedValue += subroom[0].toLowerCase()
            return formattedValue.substring(0, 10)
        case 'ПК':
            return applyGeneralCabinetMask(value, formattedValue, room, subroom, type, 3)
        case 'АВ':
        case 'ПР':
        case 'СС':
        case 'МИХ':
            return applyGeneralCabinetMask(value, formattedValue, room, subroom, type)
        case '':
            return value
        default:
            return formattedValue + value.substring(type.length + 1)
    }
}

const innerPhoneMask = (value: string) => value.replace(/\D/g, '').substring(0, 4)

const Masks = {
    groupMask,
    phoneMask,
    cabinetMask,
    innerPhoneMask,
}

export default Masks
