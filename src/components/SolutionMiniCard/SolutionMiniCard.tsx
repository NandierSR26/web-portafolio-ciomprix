import React from 'react'
import styles from './SolutionMiniCard.module.scss'

interface SolutionMiniCardProps {
    image: string;
    title: string;
}

export const SolutionMiniCard = ({ image, title }: SolutionMiniCardProps) => {
    return (
        <div className={`${styles.solution_mini_card} bg-dark-purple p-5 rounded-xl`}>
            <img 
                src={image}
                className="mb-5 mx-auto"
                alt="solution_image" 
            />

            <h4 className="text-xl font-normal text-center">{ title }</h4>
        </div>
    )
}
