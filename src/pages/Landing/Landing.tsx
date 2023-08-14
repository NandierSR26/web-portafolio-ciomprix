import React, { useEffect, useState } from 'react'
import bannerBgImage from '/images/img-main-banner.png'
import ciomprixLogo from '/images/ciomprix-logo-white.svg'
import { CategoriesCard, SolutionMiniCard } from '../../components'
import styles from './Landing.module.scss'
import { useMainContext } from '../../context'
import { CarouselSection } from '../../components/CarouselSection'
import { ICategory } from '../../interfaces'
import { Link } from 'react-router-dom'

export const Landing = () => {

    const { solutions, categories, fetching, getCategoryByIdSolution } = useMainContext()
    const [categoriesBySolution, setCategoriesBySolution] = useState<ICategory[]>([])

    const getCategoriesBySolution = (id_solution: number): ICategory[] => {
        return categories.filter(category => category.id_s === id_solution)
    }

    // useEffect(() => {
    //     if (!categoriesBySolution.categories.length) return
    //     console.log(categoriesBySolution)
    // }, [categoriesBySolution])

    return (
        <div className="bg-white w-full h-full">
            <div
                className={`${styles.landing__banner}`}
                style={{
                    backgroundImage: `url(${bannerBgImage})`
                }}
            >
                <header className="flex justify-between items-center px-7 md:px-28 py-5">
                    <figure>
                        <img src={ciomprixLogo} alt="logo" />
                    </figure>

                    <div className="flex-1"></div>

                    <ul className="flex flex-1 justify-between items-center gap-10">
                        <li>item 1</li>
                        <li>item 2</li>
                        <li>item 3</li>
                        <li>item 4</li>
                    </ul>
                </header>

                <section className="w-full max-w-[1500px] mx-auto px-7 md:px-32 my-28">
                    <h1 className="font-bold text-7xl w-2/4 mb-7">Conoce nuestro portafolio de servicios</h1>
                    <p className="text-4xl font-normal w-2/4">La forma de generar aprendizaje mas facil</p>

                    <div className={styles.landing__solutions_container}>
                        {
                            solutions.map(({ id, img_s, tittle_s }) => (
                                <SolutionMiniCard key={id} image={img_s} title={tittle_s} />
                            ))
                        }
                    </div>
                </section>

            </div>
            {
                solutions.map(solution => (
                    <CarouselSection key={solution.id} element={solutions} title={solution.tittle_s}>
                        {getCategoriesBySolution(solution.id).map(category => (
                           <CategoriesCard category={category} />
                        ))}
                    </CarouselSection>
                ))
            }
        </div>
    )
}
