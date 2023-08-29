import React, { useEffect, useState } from 'react'
import { CategoriesCard, Footer, Loader, SolutionMiniCard } from '../../components'
import { CarouselSection } from '../../components/CarouselSection'
import { ICategory } from '../../interfaces'
import { useMainContext } from '../../context'
import useScreenSize from '../../hooks/useScreenSize'

import bannerBgImage from '/images/img-main-banner.png'
import bannerBgMobile from '/images/img-main-banner-mobile.png'
import ciomprixLogo from '/images/ciomprix-logo-white.svg'
import styles from './Landing.module.scss'
import { useParams } from 'react-router-dom'

export const Landing = () => {

    const { solutions, categories, fetching, getCategoryByIdSolution, getCompanyByAlias, companyByAlias, setFetching } = useMainContext()
    const [categoriesBySolution, setCategoriesBySolution] = useState<ICategory[]>([])
    const { width } = useScreenSize()
    const { alias } = useParams()

    const getCategoriesBySolution = (id_solution: number): ICategory[] => {
        return categories.filter(category => category.id_s === id_solution)
    }

    useEffect(() => {
        if (!alias) return

        setFetching(true)
        getCompanyByAlias(alias).then(company => setFetching(false))
    }, [alias])

    if (fetching) return <Loader />

    return (
        <div>
            <header className="flex justify-between items-center gap-32  px-7 md:px-28 py-5 bg-blue-primary">
                <figure className="w-40 md:w-auto mx-auto">
                    <img
                        src={companyByAlias.id ? import.meta.env.VITE_API_URL_PROD + '/' + companyByAlias.logo : ciomprixLogo}
                        className='w-[160px] h-[40px] md:w-[250px] md:h-[50px]'
                        alt="logo"
                    />
                </figure>

                {/* <div className="flex-1"></div> */}

                {
                    width >= 1024 && (
                        <ul className="flex-1 justify-end items-center gap-10 hidden md:flex">
                            {
                                solutions.slice(0, 4).map(solution => (
                                    <li
                                        className={`${styles.landing__nav_item}`}
                                        key={solution.id}
                                    >
                                        <a
                                            href={`#section-${solution.id}`}
                                            className={`${styles.landing__navlinks}`}
                                        >
                                            {solution.tittle_s}
                                        </a>

                                        <div className={`w-0 mx-auto bg-white h-[2px] ${styles.landing__navlink_active}`}></div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </header>
            <div
                className={`${styles.landing__banner} mb-5`}
                style={{
                    backgroundImage: `url(${width > 1024 ? bannerBgImage : bannerBgMobile})`,
                }}
            >
                <section className="w-full max-w-[1800px] mx-auto px-7 md:px-32 py-16 lg:py-20">
                    <h1 className="title max-w-xs mx-auto lg:max-w-lg 2xl:max-w-3xl lg:mx-0 mb-7 text-center lg:text-left">Conoce nuestro portafolio de servicios</h1>
                    <p className="subtitle max-w-xs mx-auto lg:max-w-lg 2xl:max-w-3xl lg:mx-0 text-center lg:text-left">La forma de generar aprendizaje más fácil</p>
                </section>

            </div>

            <div className={`${styles.landing__solutions_container} mx-auto px-7 md:px-32`}>
                {
                    solutions.map(({ id, img_s, tittle_s }) => (
                        <SolutionMiniCard
                            key={id}
                            idSolution={id as number}
                            image={img_s as string}
                            title={tittle_s as string}
                            companyByAlias={companyByAlias}
                        />
                    ))
                }
            </div>


            {
                solutions && solutions.map((solution, i) => (
                    <CarouselSection key={solution.id} element={solution} title={solution.tittle_s as string} className={`${i === 0 ? 'mt-40' : 0}`}>
                        {getCategoriesBySolution(solution.id as number).map(category => (
                            <CategoriesCard key={category.id} category={category} />
                        ))}
                    </CarouselSection>
                ))
            }

            <Footer logo={companyByAlias.id ? companyByAlias.logo : ciomprixLogo} company={companyByAlias.name ? companyByAlias.name : "Ciomprix"} />
        </div>
    )
}
