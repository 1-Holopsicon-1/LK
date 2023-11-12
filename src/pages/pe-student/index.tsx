import { WorkType } from '@entities/pe-student-additional-points/types'
import { selectedPEStudentModel } from '@entities/pe-student/model'
import { calcSummaryPoints } from '@entities/pe-student/utils/cals-summary-points'
import { peTeacherModel } from '@entities/pe-teacher'
import { $userStore } from '@entities/user/model'
import { sliderData } from '@features/physical-education/student/pe-student-visits/constants'
import { CenterPage, Error } from '@shared/ui/atoms'
import PageBlock from '@shared/ui/page-block'
import { Title } from '@shared/ui/title'
import { useUnit } from 'effector-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Slider from 'widgets/slider'
import { ContentWrapper, UserData } from './styled'
import { UserDataBlock } from './ui/user-data-block'

const PEStudent = () => {
    const { studentId: studentIdFromParams } = useParams<{ studentId: string }>()
    const [student, { currentUser }] = useUnit([selectedPEStudentModel.stores.$selectedStudent, $userStore])

    const studentId = currentUser?.user_status === 'staff' ? studentIdFromParams : currentUser?.guid ?? ''
    const [currentPage, setCurrentPage] = useState<number>(0)

    useEffect(() => {
        selectedPEStudentModel.events.setCurrentStudentId(studentId)

        peTeacherModel.events.load()

        return () => selectedPEStudentModel.events.resetStudentId()
    }, [studentId])

    if (studentId && !student) {
        return <Error text="Нет данных" />
    }

    if (!student) return null

    return (
        <CenterPage padding="10px">
            <PageBlock>
                <Title size={3} align="left">
                    {student.fullName}
                </Title>

                <UserData>
                    <UserDataBlock label="Группа" value={student.groupNumber} />
                    <UserDataBlock label="Баллы" value={calcSummaryPoints(student).toString()} />
                    <UserDataBlock label="Курс" value={student.course.toString()} />
                    <UserDataBlock
                        label="ЛМС"
                        value={student.pointsHistory
                            .filter((d) => (d as any).workType === WorkType.OnlineWork)
                            .reduce((sum, d) => sum + d.points, 0)
                            .toString()}
                    />
                </UserData>

                <Slider
                    appearance={false}
                    pages={sliderData}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ContentWrapper>{sliderData[currentPage].content}</ContentWrapper>
            </PageBlock>
        </CenterPage>
    )
}

export default PEStudent
