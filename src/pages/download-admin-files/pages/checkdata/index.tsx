import React from 'react'

import { adminLinksModel } from '@entities/admin-links'

import AdminLinksTemplate from '@shared/widgets/admin-links-template'

const DownloadCheckdata = () => {
    const { data } = adminLinksModel.selectors.useData()
    return <AdminLinksTemplate title={'Скачать отчеты по анкете'} links={data?.checkdata} />
}

export default DownloadCheckdata
