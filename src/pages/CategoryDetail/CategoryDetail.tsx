import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useMainContext } from '../../context'
import { ContentCard } from '../../components'

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ciomprixLogo from '/images/ciomprix-logo-gray.svg'
import styles from './CategoryDetail.module.scss'

export const CategoryDetail = () => {

    const { id } = useParams()
    const { getCategoryById, categoryByID, getSolutionByID, solutionByID, getContentByCategory, contentsByCategory, fetching } = useMainContext()

    useEffect(() => {
        getCategoryById(Number(id))
    }, [])

    useEffect(() => {
        if (!categoryByID) return
        getSolutionByID(categoryByID.id_s)
        getContentByCategory(categoryByID.id)
    }, [categoryByID])


    if (fetching) return <h1 className="text-black">Cargando...</h1>

    return (
        <main>
            <header className="flex justify-between items-center px-7 md:px-28 py-5 bg-light-gray">
                <figure>
                    <img src={ciomprixLogo} alt="logo" />
                </figure>

                <div className="flex-1"></div>

                <ul className="flex flex-1 justify-between items-center text-gray-500 gap-10">
                    <li>item 1</li>
                    <li>item 2</li>
                    <li>item 3</li>
                    <li>item 4</li>
                </ul>
            </header>

            <section
                style={{
                    backgroundImage: `url(${solutionByID ? import.meta.env.VITE_API_URL_DEVELOPMENT + '/' + solutionByID.img_banner_s : ''})`,
                }}
                className={`${styles.category_detail__banner} `}
            >
                <div className="px-7 md:px-28 max-w-[1800px] mx-auto flex flex-col justify-start pt-20 h-full">
                    <div className="text-[#191934] text-base font-medium flex items-center gap-5 mb-10 cursor-pointer">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span> Volver</span>
                    </div>
                    <h1 className="text-[#191934] text-7xl font-bold w-2/5 mb-10">{solutionByID?.tittle_s}</h1>
                    <p className="text-[#191934] text-lg font-medium w-1/3">{categoryByID?.description_c}</p>
                </div>
            </section>

            <section className="px-7 md:px-28 max-w-[1800px] mx-auto my-10">
                <h2 className="text-[#191934] text-3xl font-medium mb-10 pb-5 border-b-[1px] border-[#191934]">{categoryByID?.tittle_c}</h2>

                <div className={`${styles.contents__container}`}>
                    {
                        contentsByCategory && contentsByCategory.map( content => (
                            <ContentCard key={content.id} content={content} />
                        ))
                    }
                </div>
            </section>
        </main>
    )
}
