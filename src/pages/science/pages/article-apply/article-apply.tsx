import React from 'react'
import { useParams } from 'react-router'

import { useGate, useStoreMap, useUnit } from 'effector-react'

import { CenterPage, Input, SubmitButton } from '@shared/ui/atoms'
import FormBlockWrapper from '@shared/ui/atoms/form-block'
import Select from '@shared/ui/select'
import { Title } from '@shared/ui/title'

import * as model from './model'

const ArticleApply = () => {
    const { id } = useParams<{ id: string }>()
    useGate(model.ArticleApplyGate, { articleId: id })

    return (
        <CenterPage padding="10px">
            <FormBlockWrapper noHeader>
                <Title size={4} align="left">
                    Заявить об авторстве
                </Title>
                <ArticleTitle />
                <Department />
                <Submit />
            </FormBlockWrapper>
        </CenterPage>
    )
}

const ArticleTitle = () => {
    const [value, setValue] = useUnit([model.title.value, model.title.setValue])
    return (
        <Input
            title="Название статьи"
            placeholder="Название статьи"
            value={value}
            setValue={setValue}
            isActive={false}
        />
    )
}

const Department = () => {
    const [value, setValue] = useUnit([model.department.value, model.department.setValue])
    const departments = useStoreMap(
        model.$departments,
        (departments) => departments?.map(({ name, guid }) => ({ id: guid, title: name })) ?? [],
    )

    return (
        <Select
            title="Кафедра"
            placeholder="Кафедра"
            width="100%"
            items={departments}
            selected={value}
            setSelected={setValue}
            withSearch
            isActive={!!departments.length}
        />
    )
}

const Submit = () => {
    const [sendForm, completed, setCompleted, loading, isActive] = useUnit([
        model.sendForm,
        model.completed.value,
        model.completed.setValue,
        model.$formPending,
        model.$isActive,
    ])

    return (
        <SubmitButton
            text={!completed ? 'Отправить' : 'Отправлено'}
            action={sendForm}
            isLoading={loading}
            completed={completed}
            setCompleted={setCompleted}
            repeatable={false}
            buttonSuccessText="Отправлено"
            isDone={completed}
            isActive={isActive}
            popUpFailureMessage={'Для отправки формы необходимо, чтобы все поля были заполнены'}
            popUpSuccessMessage="Данные формы успешно отправлены"
        />
    )
}

export default ArticleApply
