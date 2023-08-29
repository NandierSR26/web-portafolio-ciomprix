import React from 'react'
import styles from './SolutionMiniCard.module.scss'
import { ICompany } from '../../interfaces';

interface SolutionMiniCardProps {
    image: string;
    title: string;
    companyByAlias: ICompany;
    idSolution: number;
}

export const SolutionMiniCard = ({ image, title, companyByAlias, idSolution }: SolutionMiniCardProps) => {
    return (
        <a
            href={`#section-${idSolution}`}
            className={`${styles.solution_mini_card} p-5 rounded-xl min-h-[240px]`}
            style={{
                backgroundColor: `${companyByAlias.color1}`
            }}
        >
            <img 
                src={`${import.meta.env.VITE_API_URL_PROD}/${image}`}
                className="mb-5 mx-auto w-[110px] h-[110px]"
                alt="solution_image" 
            />

            <h4 className="text-xl font-normal text-center text-white">{ title }</h4>
        </a>
    )
}
