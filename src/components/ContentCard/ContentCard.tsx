import React from 'react'
import styles from './ContentCard.module.scss'
import { IContent } from '../../interfaces'
import { useMainContext } from '../../context';
import { Link } from 'react-router-dom';

interface ContentCardProps {
    content: IContent;
}

export const ContentCard = ({ content }: ContentCardProps) => {

    const { videoModalOpen, setVideoModalOpen, setVideoContentUrl } = useMainContext()

    return (
        <div
            style={{
                backgroundImage: `url(${import.meta.env.VITE_API_URL_PROD}/${content.img_sc})`,
                backgroundPosition: 'center'
            }}
            className={`${styles.content__card} bg-cover w-full h-[370px] rounded-3xl relative overflow-hidden`}
        >
            <div className={`${styles.content__card__backdrop}`}>
                <h4 className='w-full px-4 mb-6 openBold text-white text-base xl:text-xl text-center font-medium'>{content.tittle_sc}</h4>
                {
                    content.vid_sc_origin === 0 ? (
                        <button
                            onClick={() => {
                                setVideoContentUrl(content.vid_sc)
                                setVideoModalOpen(true)
                            }}
                            className='w-24 py-1 mb-8 bg-blue-500 px-6 text-white rounded-full text-l text-center openMedium transition-all duration-200 hover:scale-110 hover:text-white'
                        >
                            Ver
                        </button>
                    ) : (
                        <button
                            className='w-24 py-1 mb-8 bg-blue-500 px-6 text-white rounded-full text-l text-center openMedium transition-all duration-200 hover:scale-110 hover:text-white'
                            onClick={() => {
                                setVideoContentUrl(import.meta.env.VITE_API_URL_PROD + '/' + content.vid_sc)
                                setVideoModalOpen(true)
                            }}
                        >
                            Ver
                        </button>
                    )
                }
            </div>
        </div>
    )
}
