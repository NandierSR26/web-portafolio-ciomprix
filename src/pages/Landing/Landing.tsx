import React, { useEffect, useState } from 'react'
import { CategoriesCard, SolutionMiniCard } from '../../components'
import { CarouselSection } from '../../components/CarouselSection'
import { ICategory } from '../../interfaces'
import { useMainContext } from '../../context'
import useScreenSize from '../../hooks/useScreenSize'

import bannerBgImage from '/images/img-main-banner.png'
import bannerBgMobile from '/images/img-main-banner-mobile.png'
import ciomprixLogo from '/images/ciomprix-logo-white.svg'
import styles from './Landing.module.scss'

export const Landing = () => {

    const { solutions, categories, fetching, getCategoryByIdSolution } = useMainContext()
    const [categoriesBySolution, setCategoriesBySolution] = useState<ICategory[]>([])
    const { width } = useScreenSize() 

    const getCategoriesBySolution = (id_solution: number): ICategory[] => {
        return categories.filter(category => category.id_s === id_solution)
    }

    // useEffect(() => {
    //     if (!categoriesBySolution.categories.length) return
    //     console.log(categoriesBySolution)
    // }, [categoriesBySolution])

    return (
        <div>
            <header className="flex justify-between items-center px-7 md:px-28 py-5 bg-blue-primary">
                <figure className="w-40 md:w-auto">
                    <img src={ciomprixLogo} className='' alt="logo" />
                </figure>

                <div className="flex-1"></div>

                <ul className="flex-1 justify-between items-center gap-10 hidden md:flex">
                    <li className={`${styles.landing__navlinks}`}>item 1</li>
                    <li className={`${styles.landing__navlinks}`}>item 2</li>
                    <li className={`${styles.landing__navlinks}`}>item 3</li>
                    <li className={`${styles.landing__navlinks}`}>item 4</li>
                </ul>
            </header>
            <div
                className={`${styles.landing__banner} mb-5`}
                style={{
                    backgroundImage: `url(${width > 1024 ? bannerBgImage : bannerBgMobile})`,
                }}
            >
                <section className="w-full max-w-[1800px] mx-auto px-7 md:px-32 py-16 lg:py-20">
                    <h1 className="title max-w-xs mx-auto lg:max-w-lg 2xl:max-w-3xl lg:mx-0 mb-7 text-center lg:text-left">Conoce nuestro portafolio de servicios</h1>
                    <p className="subtitle max-w-xs mx-auto lg:max-w-lg 2xl:max-w-3xl lg:mx-0 text-center lg:text-left">La forma de generar aprendizaje mas facil</p>
                </section>

            </div>

            <div className={`${styles.landing__solutions_container} mx-auto px-7 md:px-32`}>
                {
                    solutions.map(({ id, img_s, tittle_s }) => (
                        <SolutionMiniCard key={id} image={img_s as string} title={tittle_s as string} />
                    ))
                }
            </div>


            {
                solutions && solutions.map((solution, i) => (
                    <CarouselSection key={solution.id} element={solutions} title={solution.tittle_s as string} className={`${i === 0 ? 'mt-40' : 0}`}>
                        {getCategoriesBySolution(solution.id as number).map(category => (
                            <CategoriesCard key={category.id} category={category} />
                        ))}
                    </CarouselSection>
                ))
            }
        </div>
    )
}
