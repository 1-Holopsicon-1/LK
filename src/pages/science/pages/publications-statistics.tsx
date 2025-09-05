import React, { useState } from 'react'

import styled from 'styled-components'

import { Title } from '@shared/ui/title'

const PageWrapper = styled.div`
    padding: 24px;
    background: var(--theme);
    color: var(--text);
    min-height: 100vh;
    transition:
        background-color 0.3s,
        color 0.3s;
`

const FiltersContainer = styled.div`
    margin: 24px 0;
    padding: 20px;
    background: var(--theme-2);
    border-radius: 8px;
    border: 1px solid var(--theme-3);
`

const FiltersGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
`

const FilterGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const FilterLabel = styled.label`
    color: var(--text);
    font-size: 14px;
    font-weight: 500;
`

const FilterSelect = styled.select`
    padding: 8px 12px;
    background: var(--theme);
    border: 1px solid var(--theme-3);
    border-radius: 6px;
    color: var(--text);
    font-size: 14px;
    outline: none;

    &:focus {
        border-color: var(--reallyBlue);
    }
`

const FilterInput = styled.input`
    padding: 8px 12px;
    background: var(--theme);
    border: 1px solid var(--theme-3);
    border-radius: 6px;
    color: var(--text);
    font-size: 14px;
    outline: none;

    &:focus {
        border-color: var(--reallyBlue);
    }
`

const YearRangeContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
`

const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
`

const ActionButton = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &.primary {
        background: var(--reallyBlue);
        color: white;

        &:hover {
            opacity: 0.9;
        }
    }

    &.secondary {
        background: var(--theme-3);
        color: var(--text);

        &:hover {
            background: var(--theme-4);
        }
    }
`

const GeneralStatsContainer = styled.div`
    margin: 24px 0;
`

const GeneralStatsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    margin-top: 16px;
`

const GeneralStatCard = styled.div`
    background: var(--theme-2);
    border-radius: 8px;
    border: 1px solid var(--theme-3);
    padding: 24px;
    text-align: center;
`

const StatNumber = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: var(--reallyBlue);
    margin-bottom: 8px;
`

const StatDescription = styled.div`
    color: var(--text);
    font-size: 14px;
`

const StatisticsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 24px;
`

const FacultyCard = styled.div`
    background: var(--theme-2);
    border-radius: 8px;
    border: 1px solid var(--theme-3);
    padding: 24px;
    transition:
        background-color 0.3s,
        border-color 0.3s;
`

const FacultyTitle = styled.h3`
    color: var(--text);
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px 0;
    transition: color 0.3s;
`

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
`

const StatItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background: var(--theme);
    border-radius: 6px;
    border: 1px solid var(--theme-3);
    transition:
        background-color 0.3s,
        border-color 0.3s;
`

const StatLabel = styled.span`
    color: var(--text);
    font-size: 14px;
    transition: color 0.3s;
`

const StatValue = styled.span`
    color: var(--reallyBlue);
    font-weight: 600;
    font-size: 14px;
`

const ChartSection = styled.div`
    margin-top: 16px;
`

const ChartTitle = styled.h4`
    color: var(--text);
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 12px 0;
    transition: color 0.3s;
`

const YearBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding: 8px;
    background: var(--theme);
    border-radius: 4px;
    border: 1px solid var(--theme-3);
    transition:
        background-color 0.3s,
        border-color 0.3s;
`

const YearLabel = styled.span`
    color: var(--text);
    font-size: 13px;
    font-weight: 500;
    min-width: 60px;
    transition: color 0.3s;
`

const ProgressBar = styled.div`
    flex: 1;
    height: 8px;
    background: var(--theme-3);
    border-radius: 4px;
    margin: 0 12px;
    overflow: hidden;
    transition: background-color 0.3s;
`

const ProgressFill = styled.div<{ width: number }>`
    height: 100%;
    background: var(--reallyBlue);
    width: ${(props) => props.width}%;
    border-radius: 4px;
    transition: width 0.3s ease;
`

const YearValue = styled.span`
    color: var(--reallyBlue);
    font-size: 13px;
    font-weight: 600;
    min-width: 40px;
    text-align: right;
`

const AuthorsSection = styled.div`
    margin-top: 16px;
`

const AuthorsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const AuthorItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background: var(--theme);
    border-radius: 4px;
    border: 1px solid var(--theme-3);
    transition:
        background-color 0.3s,
        border-color 0.3s;
`

const AuthorName = styled.span`
    color: var(--text);
    font-size: 13px;
    transition: color 0.3s;
`

const AuthorCount = styled.span`
    color: var(--reallyBlue);
    font-size: 13px;
    font-weight: 600;
`

// Мок данные
const mockData = [
    {
        id: '1',
        name: 'Факультет информационных технологий',
        publicationCount: 45,
        wosCount: 28,
        scopusCount: 35,
        citationCount: 284,
        yearlyStats: [
            { year: '2024', count: 12 },
            { year: '2023', count: 18 },
            { year: '2022', count: 15 },
        ],
        topAuthors: [
            { name: 'Иванов И.И.', count: 8 },
            { name: 'Петров П.П.', count: 6 },
            { name: 'Сидоров С.С.', count: 5 },
        ],
    },
    {
        id: '2',
        name: 'Факультет машиностроения',
        publicationCount: 32,
        wosCount: 18,
        scopusCount: 25,
        citationCount: 156,
        yearlyStats: [
            { year: '2024', count: 8 },
            { year: '2023', count: 14 },
            { year: '2022', count: 10 },
        ],
        topAuthors: [
            { name: 'Козлов К.К.', count: 7 },
            { name: 'Волков В.В.', count: 4 },
            { name: 'Орлов О.О.', count: 3 },
        ],
    },
]

const PublicationStatisticsPage = () => {
    const [selectedSubdivision, setSelectedSubdivision] = useState('Отдел внутренней разработки')
    const [selectedPublicationType, setSelectedPublicationType] = useState('Статьи в журнале')
    const [includeWebOfScience, setIncludeWebOfScience] = useState('Не важно')
    const [includeScopus, setIncludeScopus] = useState('Не важно')
    const [yearFrom, setYearFrom] = useState('2020')
    const [yearTo, setYearTo] = useState('2024')

    const maxCount = Math.max(...mockData.flatMap((faculty) => faculty.yearlyStats.map((year) => year.count)))

    return (
        <PageWrapper style={{ marginTop: '5rem' }}>
            <FiltersContainer>
                <FiltersGrid>
                    <FilterGroup>
                        <FilterLabel>Подразделения</FilterLabel>
                        <FilterSelect
                            value={selectedSubdivision}
                            onChange={(e) => setSelectedSubdivision(e.target.value)}
                        >
                            <option>Отдел внутренней разработки</option>
                            <option>Факультет информационных технологий</option>
                            <option>Факультет машиностроения</option>
                        </FilterSelect>
                    </FilterGroup>

                    <FilterGroup>
                        <FilterLabel>Типы публикаций</FilterLabel>
                        <FilterSelect
                            value={selectedPublicationType}
                            onChange={(e) => setSelectedPublicationType(e.target.value)}
                        >
                            <option>Статьи в журнале</option>
                            <option>Тезисы конференции</option>
                            <option>Обзоры</option>
                        </FilterSelect>
                    </FilterGroup>

                    <FilterGroup>
                        <FilterLabel>Включать Web of Science</FilterLabel>
                        <FilterSelect
                            value={includeWebOfScience}
                            onChange={(e) => setIncludeWebOfScience(e.target.value)}
                        >
                            <option>Не важно</option>
                            <option>Да</option>
                            <option>Нет</option>
                        </FilterSelect>
                    </FilterGroup>

                    <FilterGroup>
                        <FilterLabel>Включать Scopus</FilterLabel>
                        <FilterSelect value={includeScopus} onChange={(e) => setIncludeScopus(e.target.value)}>
                            <option>Не важно</option>
                            <option>Да</option>
                            <option>Нет</option>
                        </FilterSelect>
                    </FilterGroup>
                </FiltersGrid>

                <YearRangeContainer>
                    <FilterLabel>Год с:</FilterLabel>
                    <FilterInput type="number" value={yearFrom} onChange={(e) => setYearFrom(e.target.value)} />
                    <FilterLabel>Год по:</FilterLabel>
                    <FilterInput type="number" value={yearTo} onChange={(e) => setYearTo(e.target.value)} />
                </YearRangeContainer>

                <ActionButtons>
                    <ActionButton className="primary">Получить статистику</ActionButton>
                    <ActionButton className="secondary">Сбросить</ActionButton>
                </ActionButtons>
            </FiltersContainer>

            <GeneralStatsContainer>
                <Title size={2} align="left" bottomGap={false}>
                    Общая статистика
                </Title>
                <GeneralStatsGrid>
                    <GeneralStatCard>
                        <StatNumber>77</StatNumber>
                        <StatDescription>Всего публикаций</StatDescription>
                    </GeneralStatCard>
                    <GeneralStatCard>
                        <StatNumber>440</StatNumber>
                        <StatDescription>Всего цитирований</StatDescription>
                    </GeneralStatCard>
                    <GeneralStatCard>
                        <StatNumber>5.71</StatNumber>
                        <StatDescription>Среднее цитирований на публикацию</StatDescription>
                    </GeneralStatCard>
                </GeneralStatsGrid>
            </GeneralStatsContainer>

            <StatisticsContainer>
                {mockData.map((faculty) => (
                    <FacultyCard key={faculty.id}>
                        <FacultyTitle>{faculty.name}</FacultyTitle>

                        <StatsGrid>
                            <StatItem>
                                <StatLabel>Всего публикаций:</StatLabel>
                                <StatValue>{faculty.publicationCount}</StatValue>
                            </StatItem>
                            <StatItem>
                                <StatLabel>Web of Science:</StatLabel>
                                <StatValue>{faculty.wosCount}</StatValue>
                            </StatItem>
                            <StatItem>
                                <StatLabel>Scopus:</StatLabel>
                                <StatValue>{faculty.scopusCount}</StatValue>
                            </StatItem>
                        </StatsGrid>

                        <StatItem>
                            <StatLabel>Цитирования:</StatLabel>
                            <StatValue>{faculty.citationCount}</StatValue>
                        </StatItem>

                        <ChartSection>
                            <ChartTitle>Публикации по годам</ChartTitle>
                            {faculty.yearlyStats.map((yearStat) => (
                                <YearBar key={yearStat.year}>
                                    <YearLabel>{yearStat.year} год</YearLabel>
                                    <ProgressBar>
                                        <ProgressFill width={(yearStat.count / maxCount) * 100} />
                                    </ProgressBar>
                                    <YearValue>{yearStat.count} публикаций</YearValue>
                                </YearBar>
                            ))}
                        </ChartSection>

                        <AuthorsSection>
                            <ChartTitle>Топ авторов</ChartTitle>
                            <AuthorsList>
                                {faculty.topAuthors.map((author, index) => (
                                    <AuthorItem key={index}>
                                        <AuthorName>{author.name}</AuthorName>
                                        <AuthorCount>{author.count}</AuthorCount>
                                    </AuthorItem>
                                ))}
                            </AuthorsList>
                        </AuthorsSection>
                    </FacultyCard>
                ))}
            </StatisticsContainer>
        </PageWrapper>
    )
}

export default PublicationStatisticsPage
