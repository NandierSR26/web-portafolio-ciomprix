import React, { ReactNode, useState } from 'react'
import styles from './AdminLayout.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBuilding, faChartLine, faClose, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import logoCiom from '/images/ciomprix-logo-white.svg'
import { GrStorage } from 'react-icons/gr'
import { MdManageSearch, MdCategory } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface AdminLayoutProps {
    children: ReactNode;
    currentPageName: string;
    logo: boolean;
}

export const AdminLayout = ({ children, currentPageName, logo }: AdminLayoutProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="relative w-full min-h-screen">
            <header className="w-full bg-blue-primary mb-10">
                <div className="flex justify-between items-center gap-5 px-7 md:px-28 py-5 max-w-[1800px] mx-auto">
                    <FontAwesomeIcon
                        icon={faBars}
                        className="text-4xl cursor-pointer text-white"
                        onClick={() => setIsOpen(true)}
                    />

                    <figure>
                        <img src={logoCiom} alt="logo" />
                    </figure>

                    <FontAwesomeIcon icon={faRightFromBracket} className="text-4xl cursor-pointer text-white" />
                </div>
            </header>

            <main className="px-7 md:px-28 py-5 max-w-[1800px] mx-auto">
                <h1 className="text-4xl font-bold text-black text-center mb-5">{currentPageName}</h1>
                <hr className="border-[1px] border-solid border-gray-500 mb-5" />

                {logo && (
                    <figure className="bg-gray-500 w-fit mx-auto p-5 rounded-full mb-10">
                        <img src={logoCiom} className="w-80" alt="" />
                    </figure>
                )}

                {children}
            </main>


            <aside
                className={`${styles.sidemenu} ${isOpen ? styles.open : ''} fixed w-[420px] h-screen top-0 left-0 bg-white p-5`}
            >
                <div className="flex justify-between gap-5 items-center">
                    <h2 className="text-3xl font-bold mb-3 text-black">Administrador</h2>

                    <FontAwesomeIcon
                        icon={faClose}
                        className="text-3xl text-black cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    />
                </div>
                <div className="w-full h-1 bg-black mb-10"></div>

                <section className="flex flex-col gap-10">
                    <div 
                        className="flex items-center gap-5 cursor-pointer" 
                        onClick={() => navigate('/admin/dashboard')}
                    >
                        <FontAwesomeIcon icon={faChartLine} className="text-3xl text-black" />
                        <p className="text-2xl text-black font-semibold">Dashboard</p>
                    </div>

                    <div 
                        className="flex items-center gap-5 cursor-pointer" 
                        onClick={() => navigate('/admin/solutions')}
                    >
                        <MdManageSearch size={'30px'} color='black' />
                        <p className="text-2xl text-black font-semibold">Soluciones</p>
                    </div>

                    <div 
                        className="flex items-center gap-5 cursor-pointer" 
                        onClick={() => navigate('/admin/categories')}
                    >
                        <MdCategory size={'30px'} color='black' />
                        <p className="text-2xl text-black font-semibold">Categorias</p>
                    </div>

                    <div 
                        className="flex items-center gap-5 cursor-pointer" 
                        onClick={() => navigate('/admin/contents')}
                    >
                        <GrStorage size={'30px'} />
                        <p className="text-2xl text-black font-semibold">Contenidos</p>
                    </div>

                    <div 
                        className="flex items-center gap-5 cursor-pointer" 
                        onClick={() => navigate('/admin/companies')}
                    >
                        <FontAwesomeIcon icon={faBuilding} className="text-3xl text-black" />
                        <p className="text-2xl text-black font-semibold">Compañias</p>
                    </div>

                </section>
            </aside>
        </div>
    )
}
