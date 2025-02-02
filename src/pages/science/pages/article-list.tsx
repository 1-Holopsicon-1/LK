import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useHistory } from 'react-router'

import { useUnit } from 'effector-react'

import { ScienceTable } from '@widgets/science-table'

import { scienceModel } from '@entities/science'

import { ARTICLES } from '@shared/routing'
import { Button } from '@shared/ui/atoms'
import Flex from '@shared/ui/flex'
import PageBlock from '@shared/ui/page-block'

const PublicationList = () => {
    const history = useHistory()
    const [pageMounted, columns] = useUnit([scienceModel.events.pageMounted, scienceModel.stores.columns])
    useEffect(() => {
        pageMounted()
    }, [])

    return (
        <PageBlock outerPadding="10px" height="100%">
            <Header />
            <ScienceTable
                columns={columns}
                onRowClick={(row) => {
                    history.push(ARTICLES + `/${row.id}`)
                }}
            />
        </PageBlock>
    )
}

const Header = () => {
    const [select, selected, articles, columns, setColumns] = useUnit([
        scienceModel.events.selectArticle,
        scienceModel.stores.selectedArticles,
        scienceModel.stores.articles,
        scienceModel.stores.columns,
        scienceModel.events.setColumns,
    ])
    const [allSelected, setAllSelected] = useState(false)
    return (
        <Flex jc="space-between" w="100%">
            <Flex gap="1.5rem">
                <Button
                    onClick={() => {
                        if (allSelected) {
                            articles.map((_, index) => {
                                if (selected.has(index)) {
                                    select(index)
                                }
                            })
                            setAllSelected(false)
                        } else {
                            articles.map((_, index) => {
                                if (!selected.has(index)) {
                                    select(index)
                                }
                            })
                            setAllSelected(true)
                        }
                    }}
                    text="Выбрать все"
                    background="var(--reallyBlue)"
                    textColor="#fff"
                    minWidth="35px"
                    height="36px"
                />
                <Button
                    onClick={() => {}}
                    text="Экспорт отчета"
                    background="var(--reallyBlue)"
                    textColor="#fff"
                    minWidth="35px"
                    height="36px"
                    isActive={false}
                />
            </Flex>
            <Button
                onClick={() => {
                    setColumns([
                        ...columns,
                        {
                            title: 'Новое поле',
                            field: '',
                            showFull: true,
                        },
                    ])
                }}
                text="Добавить поле"
                background="var(--reallyBlue)"
                textColor="#fff"
                minWidth="150px"
                height="36px"
                icon={<FiPlus />}
            />
        </Flex>
    )
}

export default PublicationList
