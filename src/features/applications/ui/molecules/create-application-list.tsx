import { User } from '@api/model'
import createApplicationSearch from '@features/applications/lib/create-application-search'
import getSectionLinks from '@features/applications/lib/get-section-links'
import { getTeachersSectionLinks } from '@features/applications/lib/get-teachers-section-links'
import isEnabledForEducationForm from '@features/applications/ui/lib/isEnabledForEducationForm'
import { IColors } from '@shared/constants'
import Flex from '@shared/ui/flex'
import { LinkItem } from '@shared/ui/link-item'
import Subtext from '@shared/ui/subtext'
import { Error } from '@ui/error'
import { LocalSearch } from '@ui/molecules'
import { Title } from '@ui/title'
import React, { useState } from 'react'
import { HiOutlineDocumentText } from 'react-icons/hi'
import styled from 'styled-components'
import { useModal } from 'widgets'

const CreateApplicationListWrapper = styled.div`
    @media (min-width: 1001px) {
        width: 100%;
        max-width: 600px;
        min-width: 600px;
        max-height: 600px;
    }

    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 70vh;

    .list {
        margin-top: 10px;
        overflow-y: auto;
        height: 100%;

        .links-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;

            .link-list {
                display: flex;
                flex-direction: column;
                width: 100%;

                .links {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    font-size: 0.9em;

                    & a {
                        text-decoration: none;
                        color: var(--blue);
                    }
                    .disabled-link {
                        cursor: not-allowed;
                        opacity: 0.5;
                        text-decoration: none;
                        pointer-events: none;
                    }
                }
            }
        }
    }

    @media (max-width: 800px) {
        .list {
            .links-wrapper {
                .link-list {
                    width: 100%;
                }
            }
        }
    }
`

export interface Section {
    title: string
    disabled?: boolean
    links: {
        title: string
        link: string
        isExternalLink?: boolean
        isOpenInNewWindow?: boolean
        disabled?: boolean
        color?: keyof IColors
        icon?: React.ReactNode
        exceptionalFormEducationList?: User['educationForm'][]
    }[]
}

interface Props {
    isTeachers?: boolean
    currentFormEducation?: User['educationForm']
}

const CreateApplicationList = ({ isTeachers = false, currentFormEducation }: Props) => {
    const { close } = useModal()
    const sections: Section[] = isTeachers ? getTeachersSectionLinks() : getSectionLinks()
    const [search, setSearch] = useState<string>('')

    const [foundSections, setFoundSections] = useState<Section[] | null>(sections)

    return (
        <CreateApplicationListWrapper>
            <LocalSearch
                whereToSearch={sections}
                searchEngine={createApplicationSearch}
                setResult={setFoundSections}
                placeholder="Поиск заявок"
                setExternalValue={setSearch}
                validationCheck
            />
            <div className="list">
                <div className="links-wrapper">
                    {(foundSections ?? sections).map((section) => {
                        if (!section.disabled)
                            return (
                                <div className="link-list" key={section.title}>
                                    <Title size={4} align="left" bottomGap>
                                        {section.title}
                                        <Subtext>{section.links.length}</Subtext>
                                    </Title>
                                    <Flex $wrap gap="8px">
                                        {section.links.map((link, index) => {
                                            if (
                                                link.disabled ||
                                                !isEnabledForEducationForm(
                                                    currentFormEducation,
                                                    link.exceptionalFormEducationList,
                                                )
                                            )
                                                return

                                            return (
                                                <LinkItem
                                                    title={link.title}
                                                    key={link.link + index}
                                                    onClick={close}
                                                    id={link.title}
                                                    isOpenInNewWindow={link.isOpenInNewWindow}
                                                    isExternalPage={link.isExternalLink}
                                                    icon={link?.icon ?? <HiOutlineDocumentText />}
                                                    path={link.link}
                                                    color={link.color ?? 'blue'}
                                                    type="horizontal"
                                                />
                                            )
                                        })}
                                    </Flex>
                                </div>
                            )
                    })}
                    {!foundSections?.length && !!search.length && (
                        <Error text={`По запросу ${search} ничего не найдено`} />
                    )}
                </div>
            </div>
        </CreateApplicationListWrapper>
    )
}

export default CreateApplicationList
