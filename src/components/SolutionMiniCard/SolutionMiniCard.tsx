import React from 'react'
import styles from './SolutionMiniCard.module.scss'

interface SolutionMiniCardProps {
    image: string;
    title: string;
}

export const SolutionMiniCard = ({ image, title }: SolutionMiniCardProps) => {
    return (
        <div className={`${styles.solution_mini_card} bg-dark-purple p-5 rounded-xl min-h-[240px]`}>
            <img 
                src={`${import.meta.env.VITE_API_URL_DEVELOPMENT}/${image}`}
                className="mb-5 mx-auto"
                alt="solution_image" 
            />

            <h4 className="text-xl font-normal text-center text-white">{ title }</h4>
        </div>
    )
}
