import React, { useEffect } from 'react'
import { AdminLayout } from '../../../components'
import { useMainContext } from '../../../context'

export const Dashboard = () => {

    const { solutions, categories, contents, companies, getContents, getCompanies } = useMainContext()


    useEffect(() => {
        getContents()
        getCompanies()
    }, [])

    return (
        <AdminLayout logo currentPageName='Dashboard'>
            <h2 className="text-3xl font-bold text-black text-center mb-5">Estadisticas</h2>

            <div className="flex justify-evenly flex-wrap gap-10">
                <div className="flex flex-col items-center w-full sm:w-fit border-[2px] border-gray-500 rounded-2xl p-5">
                    <h4 className="text-2xl text-black font-bold mb-3">{solutions.length}</h4>
                    <p className="text-black text-xl font-medium">Soluciones</p>
                </div>

                <div className="flex flex-col items-center w-full sm:w-fit border-[2px] border-gray-500 rounded-2xl p-5">
                    <h4 className="text-2xl text-black font-bold mb-3">{categories.length}</h4>
                    <p className="text-black text-xl font-medium">Categorias</p>
                </div>

                <div className="flex flex-col items-center w-full sm:w-fit border-[2px] border-gray-500 rounded-2xl p-5">
                    <h4 className="text-2xl text-black font-bold mb-3">{contents.length}</h4>
                    <p className="text-black text-xl font-medium">Contenidos</p>
                </div>

                <div className="flex flex-col items-center w-full sm:w-fit border-[2px] border-gray-500 rounded-2xl p-5">
                    <h4 className="text-2xl text-black font-bold mb-3">{companies.length}</h4>
                    <p className="text-black text-xl font-medium">Compañias</p>
                </div>
            </div>
        </AdminLayout>
    )
}
