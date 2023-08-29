import React, { ReactNode, useEffect, useRef, useState } from 'react'
import useScreenSize from '../../hooks/useScreenSize';
import { ISolutions } from '../../interfaces';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft, faAngleLeft, faAngleRight, faArrowLeft, faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { identifyDevice } from '../../utils/deviceIdentify';

import styles from './CarouselSection.module.scss'
import { useNavigate } from 'react-router-dom';

interface CarouselSectionProps {
    title: string
    className?: string
    element: ISolutions
    children: ReactNode
}

export const CarouselSection = ({ children, title, className, element }: CarouselSectionProps) => {

    const navigate = useNavigate()
    const [isHoverCarousel, setIsHoverCarousel] = useState<boolean>()
    const [widthScreen, setWidthScreen] = useState(window.innerWidth)
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const carouselRef = useRef<HTMLDivElement | null>(null)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDown(true);
        setStartX(e.pageX - carouselRef.current!.offsetLeft);
        setScrollLeft(carouselRef.current!.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsHoverCarousel(false)
        setIsDown(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current!.offsetLeft;
        const walk = x - startX;
        carouselRef.current!.scrollLeft = scrollLeft - walk;
    };

    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        if (!isHoverCarousel) return
        if (widthScreen < 1060) {
            console.log('hay scroll con mouse de mano')
            return
        }

        if (event.deltaY < 0) {
            carouselRef.current!.scrollLeft += 20
        } else if (event.deltaY > 0) {
            carouselRef.current!.scrollLeft -= 20
        }
    }

    const handleClickLeft = () => {

        carouselRef.current?.scrollTo({left:  carouselRef.current?.scrollLeft - 290})
    }

    const handleClickRight = () => {
        carouselRef.current?.scrollTo({left: carouselRef.current?.scrollLeft + 290})
    }

    useEffect(() => {
        function handleResize() {
            setWidthScreen(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className={`w-full px-7 md:px-28 max-w-[1500px] my-24 mx-auto text-black ${className}`} id={`section-${element.id}`}>
            <div className="flex items-center justify-between gap-5">
                <h3 className='text-3xl lg:text-4xl font-medium'>{title}</h3>

                <div className="flex items-center gap-3">
                    <figure 
                        className="bg-gray-600 rounded-md w-8 h-8 grid place-items-center cursor-pointer"
                        onClick={() => handleClickLeft() }
                    >
                        <FontAwesomeIcon icon={faAngleLeft} className="text-white text-xl font-bold" />
                    </figure>
                    <figure 
                        className="bg-gray-600 rounded-md w-8 h-8 grid place-items-center cursor-pointer"
                        onClick={() => handleClickRight() }
                    >
                        <FontAwesomeIcon icon={faAngleRight} className="text-white text-xl font-bold" />
                    </figure>
                </div>
            </div>

            <hr className='border-black my-4' />
            <div
                className={`${styles.carousel__items__container}`}
                onWheel={handleScroll}
                onMouseEnter={() => setIsHoverCarousel(true)}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                ref={carouselRef}
            >
                {children}
            </div>
        </section>
    )
}
