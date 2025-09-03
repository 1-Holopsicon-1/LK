import React, { useEffect, useState } from 'react'

import { Autocomplete, TextField } from '@mui/material'
import { createEffect, createEvent, createStore } from 'effector'
import { useUnit } from 'effector-react'
import styled from 'styled-components'

import {
    FractionShareStats,
    FractionShareStatsParams,
    Subdivision,
    getAuthorStats,
    getDepartmentStats,
    getFaculties,
    getFacultyStats,
    getDepartments,
} from '@shared/api/science/science-api'
import { Button } from '@shared/ui/button'
import Input from '@shared/ui/input'
import { Title } from '@shared/ui/title'

type TabType = 'faculty' | 'department' | 'author'

const PageWrapper = styled.div`
    padding: 24px;
    background: var(--theme);
    color: var(--text);
    min-height: 100vh;
    transition:
        background-color 0.3s,
        color 0.3s;
`

const TabsContainer = styled.div`
    display: flex;
    margin-bottom: 24px;
    border-bottom: 2px solid var(--theme-3);
`

const TabButton = styled.button<{ isActive: boolean }>`
    padding: 12px 24px;
    background: ${(props) => (props.isActive ? 'var(--reallyBlue)' : 'transparent')};
    color: ${(props) => (props.isActive ? 'white' : 'var(--text)')};
    border: none;
    border-bottom: 2px solid ${(props) => (props.isActive ? 'var(--reallyBlue)' : 'transparent')};
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s;
    border-radius: 8px 8px 0 0;

    &:hover {
        background: ${(props) => (props.isActive ? 'var(--reallyBlue)' : 'var(--theme-2)')};
    }
`

const FiltersWrapper = styled.div`
    margin-bottom: 24px;
    padding: 20px;
    background: var(--theme-2);
    border-radius: 8px;
    border: 1px solid var(--theme-3);
    transition:
        background-color 0.3s,
        border-color 0.3s;
`

const FiltersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
`

const YearInputWrapper = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`

const YearFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`

const YearControlsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    /* Убираем встроенные стрелочки у input[type="number"] */
    input[type="number"] {
        -moz-appearance: textfield; /* Firefox */
        
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none; /* Chrome, Safari, Edge */
            margin: 0;
        }
    }
`

const YearButton = styled.button`
    width: 32px;
    height: 32px;
    border: 1px solid var(--theme-3);
    background: var(--theme-2);
    color: var(--text);
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    &:hover {
        background: var(--theme-3);
        border-color: var(--reallyBlue);
    }

    &:active {
        transform: scale(0.95);
    }
`

const YearLabel = styled.label`
    font-weight: 500;
    color: var(--text);
    transition: color 0.3s;
`

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`

const ResultsWrapper = styled.div`
    background: var(--theme-2);
    border-radius: 8px;
    border: 1px solid var(--theme-3);
    transition:
        background-color 0.3s,
        border-color 0.3s;
`

const TableWrapper = styled.div`
    padding: 20px;
    overflow-x: auto;
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: var(--theme);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--theme-3);
    transition:
        background-color 0.3s,
        border-color 0.3s;
`

const TableHeader = styled.th`
    background: var(--theme-2);
    padding: 16px;
    text-align: left;
    font-weight: 600;
    color: var(--text);
    border-bottom: 1px solid var(--theme-3);
    transition:
        background-color 0.3s,
        border-color 0.3s,
        color 0.3s;

    &:first-child {
        border-top-left-radius: 8px;
    }

    &:last-child {
        border-top-right-radius: 8px;
    }
`

const TableRow = styled.tr`
    &:nth-child(even) {
        background: var(--theme-1);
    }

    &:hover {
        background: var(--theme-2);
    }

    transition:
        background-color 0.3s;
`

const TableCell = styled.td`
    padding: 16px;
    color: var(--text);
    border-bottom: 1px solid var(--theme-3);
    transition:
        color 0.3s,
        border-color 0.3s;

    &:last-child {
        text-align: right;
        font-weight: 600;
        color: var(--reallyBlue);
    }
`

const LoadingWrapper = styled.div`
    text-align: center;
    padding: 40px 0;
    color: var(--text);
    transition: color 0.3s;
`

const NoDataWrapper = styled.div`
    text-align: center;
    padding: 40px;
    color: var(--text);
    opacity: 0.7;
    transition: color 0.3s;
`

const PaginationWrapper = styled.div`
    padding: 20px;
    border-top: 1px solid var(--theme-3);
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
`

const PageButton = styled.button`
    padding: 8px 16px;
    background: var(--theme);
    color: var(--text);
    border: 1px solid var(--theme-3);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background: var(--theme-3);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`

const PageInfo = styled.span`
    margin: 0 16px;
    color: var(--text);
`

const fetchFacultyStatsFx = createEffect<FractionShareStatsParams, FractionShareStats[]>(getFacultyStats)
const fetchDepartmentStatsFx = createEffect<FractionShareStatsParams, FractionShareStats[]>(getDepartmentStats)
const fetchAuthorStatsFx = createEffect<FractionShareStatsParams, FractionShareStats[]>(getAuthorStats)

const fetchFacultiesFx = createEffect<string | undefined, Subdivision[]>(getFaculties)
const fetchDepartmentsFx = createEffect<{ name?: string; facultyId?: string }, Subdivision[]>(
    ({ name, facultyId }) => getDepartments(name, facultyId)
)

const setActiveTab = createEvent<TabType>()
const setFilters = createEvent<FractionShareStatsParams>()
const resetFilters = createEvent()

const $activeTab = createStore<TabType>('faculty')
const $facultyStats = createStore<FractionShareStats[]>([])
const $departmentStats = createStore<FractionShareStats[]>([])
const $authorStats = createStore<FractionShareStats[]>([])
const $faculties = createStore<Subdivision[]>([])
const $departments = createStore<Subdivision[]>([])
const $filters = createStore<FractionShareStatsParams>({
    startYear: new Date().getFullYear() - 1,
    endYear: new Date().getFullYear(),
    limit: 10,
    offset: 0,
})

$activeTab.on(setActiveTab, (_, tab) => tab)
$facultyStats.on(fetchFacultyStatsFx.doneData, (_, data) => data)
$departmentStats.on(fetchDepartmentStatsFx.doneData, (_, data) => data)
$authorStats.on(fetchAuthorStatsFx.doneData, (_, data) => data)
$faculties.on(fetchFacultiesFx.doneData, (_, data) => data)
$departments.on(fetchDepartmentsFx.doneData, (_, data) => data)
$filters.on(setFilters, (_, filters) => filters)
$filters.reset(resetFilters)

const FractionShareStatistics = () => {
    const [
        activeTab,
        facultyStats,
        departmentStats,
        authorStats,
        faculties,
        departments,
        facultyLoading,
        departmentLoading,
        authorLoading,
        facultiesLoading,
        departmentsLoading
    ] = useUnit([
        $activeTab,
        $facultyStats,
        $departmentStats,
        $authorStats,
        $faculties,
        $departments,
        fetchFacultyStatsFx.pending,
        fetchDepartmentStatsFx.pending,
        fetchAuthorStatsFx.pending,
        fetchFacultiesFx.pending,
        fetchDepartmentsFx.pending,
    ])

    const [startYear, setStartYear] = useState<string>(String(new Date().getFullYear() - 1))
    const [endYear, setEndYear] = useState<string>(String(new Date().getFullYear()))
    const [name, setName] = useState<string>('')
    const [selectedFaculty, setSelectedFaculty] = useState<Subdivision | null>(null)
    const [selectedDepartment, setSelectedDepartment] = useState<Subdivision | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [limit] = useState<number>(10)
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)
    const [departmentSearchTimeout, setDepartmentSearchTimeout] = useState<NodeJS.Timeout | null>(null)

    const getCurrentStats = () => {
        switch (activeTab) {
            case 'faculty':
                return facultyStats
            case 'department':
                return departmentStats
            case 'author':
                return authorStats
            default:
                return []
        }
    }

    const getCurrentLoading = () => {
        switch (activeTab) {
            case 'faculty':
                return facultyLoading
            case 'department':
                return departmentLoading
            case 'author':
                return authorLoading
            default:
                return false
        }
    }

    const handleSearch = () => {
        const params: FractionShareStatsParams = {
            startYear: parseInt(startYear),
            endYear: parseInt(endYear),
            name: name || undefined,
            limit,
            offset: (currentPage - 1) * limit,
            facultyId: selectedFaculty?.guid,
            departmentId: selectedDepartment?.guid,
        }

        setFilters(params)

        switch (activeTab) {
            case 'faculty':
                fetchFacultyStatsFx(params)
                break
            case 'department':
                fetchDepartmentStatsFx(params)
                break
            case 'author':
                fetchAuthorStatsFx(params)
                break
        }
    }

    const handleReset = () => {
        setStartYear(String(new Date().getFullYear() - 1))
        setEndYear(String(new Date().getFullYear()))
        setName('')
        setSelectedFaculty(null)
        setSelectedDepartment(null)
        setCurrentPage(1)
        resetFilters()
    }

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab)
        setCurrentPage(1)
        setName('') // Сбрасываем поле название при смене вкладки
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        
        // Создаем параметры с новой страницей
        const params: FractionShareStatsParams = {
            startYear: parseInt(startYear),
            endYear: parseInt(endYear),
            name: name || undefined,
            limit,
            offset: (page - 1) * limit, // Используем новое значение page
            facultyId: selectedFaculty?.guid,
            departmentId: selectedDepartment?.guid,
        }

        setFilters(params)

        switch (activeTab) {
            case 'faculty':
                fetchFacultyStatsFx(params)
                break
            case 'department':
                fetchDepartmentStatsFx(params)
                break
            case 'author':
                fetchAuthorStatsFx(params)
                break
        }
    }

    const handleStartYearChange = (increment: number) => {
        const newYear = parseInt(startYear) + increment
        const currentYear = new Date().getFullYear()
        
        // Ограничиваем диапазон от 2000 до текущего года
        if (newYear >= 2000 && newYear <= currentYear && newYear <= parseInt(endYear)) {
            setStartYear(String(newYear))
        }
    }

    const handleEndYearChange = (increment: number) => {
        const newYear = parseInt(endYear) + increment
        const currentYear = new Date().getFullYear()
        
        // Ограничиваем диапазон от стартового года до текущего + 10 лет
        if (newYear >= parseInt(startYear) && newYear <= currentYear + 10) {
            setEndYear(String(newYear))
        }
    }

    useEffect(() => {
        handleSearch()
    }, [activeTab])

    useEffect(() => {
        // Загружаем факультеты при инициализации
        fetchFacultiesFx()
    }, [])

    useEffect(() => {
        // Обновляем поиск для основной статистики при изменении названия
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }
        
        const timeout = setTimeout(() => {
            // Автоматический поиск для текущей вкладки при изменении названия
            if (name.trim().length > 0 || name === '') {
                handleSearch()
            }
        }, 500) // Больше задержка для основного поиска
        
        setSearchTimeout(timeout)
        
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [name])

    useEffect(() => {
        // Загружаем кафедры при выборе факультета
        if (selectedFaculty) {
            fetchDepartmentsFx({ facultyId: selectedFaculty.guid })
        } else {
            fetchDepartmentsFx({})
        }
        
        // Автоматически обновляем статистику при изменении факультета
        if (activeTab === 'department' || activeTab === 'author') {
            const timeout = setTimeout(() => {
                handleSearch()
            }, 300) // Небольшая задержка чтобы кафедры успели загрузиться
            
            return () => clearTimeout(timeout)
        }
    }, [selectedFaculty])

    useEffect(() => {
        // Сбрасываем выбор кафедры при смене факультета
        setSelectedDepartment(null)
    }, [selectedFaculty])

    useEffect(() => {
        // Автоматически обновляем статистику при выборе кафедры (только для авторов)
        if (activeTab === 'author' && selectedDepartment) {
            const timeout = setTimeout(() => {
                handleSearch()
            }, 100)
            
            return () => clearTimeout(timeout)
        }
    }, [selectedDepartment])

    const getTabTitle = (tab: TabType) => {
        switch (tab) {
            case 'faculty':
                return 'Статистика по факультетам'
            case 'department':
                return 'Статистика по кафедрам'
            case 'author':
                return 'Статистика по авторам'
            default:
                return ''
        }
    }

    const currentStats = getCurrentStats()
    const currentLoading = getCurrentLoading()

    return (
        <PageWrapper>
            <Title size={1} align="left" bottomGap={false}>
                Статистика Fraction Share
            </Title>

            <TabsContainer>
                <TabButton isActive={activeTab === 'faculty'} onClick={() => handleTabChange('faculty')}>
                    Факультеты
                </TabButton>
                <TabButton isActive={activeTab === 'department'} onClick={() => handleTabChange('department')}>
                    Кафедры
                </TabButton>
                <TabButton isActive={activeTab === 'author'} onClick={() => handleTabChange('author')}>
                    Авторы
                </TabButton>
            </TabsContainer>

            <FiltersWrapper>
                <Title size={3} align="left" bottomGap="16px">
                    {getTabTitle(activeTab)}
                </Title>

                <FiltersGrid>
                    <div>
                        <YearLabel>Название</YearLabel>
                        <Input value={name} setValue={setName} placeholder="Поиск по названию" width="100%" />
                    </div>

                    {(activeTab === 'department' || activeTab === 'author') && (
                        <div>
                            <YearLabel>Факультет</YearLabel>
                            <Autocomplete
                                value={selectedFaculty}
                                onChange={(_, newValue) => setSelectedFaculty(newValue)}
                                onOpen={() => {
                                    // Загружаем все факультеты при открытии списка
                                    fetchFacultiesFx(undefined)
                                }}
                                options={faculties || []}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.guid === value.guid}
                                filterOptions={(options, { inputValue }) => {
                                    return options.filter(option =>
                                        option.name.toLowerCase().includes(inputValue.toLowerCase())
                                    )
                                }}
                                loading={facultiesLoading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Выберите факультет"
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'var(--theme)',
                                                color: 'var(--text)',
                                                '& fieldset': {
                                                    borderColor: 'var(--theme-3)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'var(--theme-3)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--reallyBlue)',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'var(--text)',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                    )}

                    {activeTab === 'author' && (
                        <div>
                            <YearLabel>Кафедра</YearLabel>
                            <Autocomplete
                                value={selectedDepartment}
                                onChange={(_, newValue) => setSelectedDepartment(newValue)}
                                onOpen={() => {
                                    // Загружаем все кафедры при открытии списка
                                    if (selectedFaculty) {
                                        fetchDepartmentsFx({ facultyId: selectedFaculty.guid })
                                    } else {
                                        fetchDepartmentsFx({})
                                    }
                                }}
                                options={departments || []}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.guid === value.guid}
                                filterOptions={(options, { inputValue }) => {
                                    return options.filter(option =>
                                        option.name.toLowerCase().includes(inputValue.toLowerCase())
                                    )
                                }}
                                loading={departmentsLoading}
                                disabled={!selectedFaculty}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={selectedFaculty ? "Выберите кафедру" : "Сначала выберите факультет"}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'var(--theme)',
                                                color: 'var(--text)',
                                                '& fieldset': {
                                                    borderColor: 'var(--theme-3)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'var(--theme-3)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--reallyBlue)',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'var(--text)',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                    )}

                    <YearInputWrapper>
                        <YearFieldWrapper>
                            <YearLabel>Год с:</YearLabel>
                            <YearControlsWrapper>
                                <YearButton onClick={() => handleStartYearChange(-1)}>−</YearButton>
                                <Input
                                    value={startYear}
                                    setValue={setStartYear}
                                    placeholder="2020"
                                    width="100px"
                                    type="number"
                                />
                                <YearButton onClick={() => handleStartYearChange(1)}>+</YearButton>
                            </YearControlsWrapper>
                        </YearFieldWrapper>
                        <YearFieldWrapper>
                            <YearLabel>Год по:</YearLabel>
                            <YearControlsWrapper>
                                <YearButton onClick={() => handleEndYearChange(-1)}>−</YearButton>
                                <Input
                                    value={endYear}
                                    setValue={setEndYear}
                                    placeholder="2024"
                                    width="100px"
                                    type="number"
                                />
                                <YearButton onClick={() => handleEndYearChange(1)}>+</YearButton>
                            </YearControlsWrapper>
                        </YearFieldWrapper>
                    </YearInputWrapper>
                </FiltersGrid>

                <ButtonsWrapper>
                    <Button
                        onClick={handleSearch}
                        loading={currentLoading}
                        text={currentLoading ? 'Загрузка...' : 'Получить статистику'}
                        padding="10px 20px"
                        minWidth="200px"
                    />
                    <Button onClick={handleReset} text="Сбросить" padding="10px 20px" minWidth="120px" />
                </ButtonsWrapper>
            </FiltersWrapper>

            {currentLoading && (
                <LoadingWrapper>
                    <p>Загрузка статистики...</p>
                </LoadingWrapper>
            )}

            {!currentLoading && (
                <ResultsWrapper>
                    {currentStats.length > 0 ? (
                        <>
                            <TableWrapper>
                                <Table>
                                    <thead>
                                        <tr>
                                            <TableHeader>Название</TableHeader>
                                            <TableHeader>Fraction Share</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentStats.map((stat) => (
                                            <TableRow key={stat.id}>
                                                <TableCell>{stat.name}</TableCell>
                                                <TableCell>{stat.fractionShare.toFixed(4)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </tbody>
                                </Table>
                            </TableWrapper>

                            <PaginationWrapper>
                                <PageButton
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Предыдущая
                                </PageButton>

                                <PageInfo>Страница {currentPage}</PageInfo>

                                <PageButton
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentStats.length < limit}
                                >
                                    Следующая
                                </PageButton>
                            </PaginationWrapper>
                        </>
                    ) : (
                        <NoDataWrapper>
                            <p>Нет данных для отображения</p>
                        </NoDataWrapper>
                    )}
                </ResultsWrapper>
            )}
        </PageWrapper>
    )
}

export default FractionShareStatistics
