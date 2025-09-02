import React from 'react'
import { useHistory } from 'react-router'

import { useGate, useStoreMap } from 'effector-react'

import { ArticleApplicationStatusName, ArticleApplicationStatuses } from '@shared/api/science'
import { ARTICLE } from '@shared/routing'
import { CenterPage, Message } from '@shared/ui/atoms'
import PageBlock from '@shared/ui/page-block'
import Table from '@shared/ui/table'
import { ColumnProps } from '@shared/ui/table/types'

import * as model from './model'

const ArticleApplications = () => {
    useGate(model.ArticleApplicationsGate)
    const history = useHistory()

    const articleApplications = useStoreMap(model.$articleApplications, (articleApplications) =>
        articleApplications.map((articleApplication) => ({
            ...articleApplication,
            status: ArticleApplicationStatuses[articleApplication.status],
        })),
    )

    return (
        <CenterPage padding="10px">
            <PageBlock>
                <Table
                    columns={columns}
                    data={articleApplications}
                    onRowClick={(row) => history.push(ARTICLE.replace(':id', row.articleId))}
                />
            </PageBlock>
        </CenterPage>
    )
}

const columns: ColumnProps[] = [
    {
        field: 'article',
        title: 'Название',
        render: (value) => value.title,
        search: true,
    },
    {
        field: 'status',
        title: 'Статус',
        catalogs: Object.values(ArticleApplicationStatuses).map((val, i) => ({ id: i.toString(), title: val })),
        render: (value: ArticleApplicationStatusName) => (
            <Message
                type={value === 'Принято' ? 'success' : value === 'Отклонено' ? 'failure' : 'alert'}
                title={value || '—'}
                align="center"
                icon={null}
            />
        ),
    },
    {
        field: 'createdAt',
        title: 'Дата запроса',
        type: 'date',
        sort: true,
    },
]

export default ArticleApplications
