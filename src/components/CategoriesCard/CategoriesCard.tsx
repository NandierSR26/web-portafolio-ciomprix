import React from 'react'
import { ICategory } from '../../interfaces'
import styles from './CategoriesCard.module.scss'
import { Link } from 'react-router-dom'

interface CategoriesCardProps {
    category: ICategory
}

export const CategoriesCard = ({ category }: CategoriesCardProps) => {
    return (
        <div
            style={{
                backgroundImage: `url(${import.meta.env.VITE_API_URL_PROD}/${category.img_c})`,
                backgroundSize: 'cover'
            }}
            className={`${styles.category__card} bg-center bg-cover bg-no-repeat rounded-3xl text-white h-[450px] w-[250px] flex-shrink-0 relative overflow-hidden`}
        >
            <div className={`${styles.category__card__backdrop}`}>
                <h4 className='w-full px-4 mb-6 openBold text-base xl:text-xl text-center font-medium'>{category.tittle_c}</h4>
                <Link
                    to={`category/${category.id}`}
                    className='w-24 py-1 mb-8 bg-blue-500 px-6 text-white rounded-full text-l text-center openMedium transition-all duration-200 hover:scale-110 hover:text-white'
                >
                    Ir
                </Link>
            </div>

        </div>
    )
}
