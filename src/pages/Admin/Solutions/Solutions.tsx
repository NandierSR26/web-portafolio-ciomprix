import React from 'react'
import { AdminLayout } from '../../../components'
import { useMainContext } from '../../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export const Solutions = () => {

    const { solutions } = useMainContext()

    return (
        <AdminLayout logo={false} currentPageName='Administrador de soluciónes'>
            <div className="flex justify-start flex-wrap gap-10">
                {solutions.map(solution => (
                    <div key={solution.id} className="w-full flex-1 sm:max-w-md p-5 bg-white rounded-2xl shadow-xl">
                        <div className="flex justify-between w-full mb-16">
                            <div className="p-2 bg-blue-primary rounded-lg w-10 h-10 flex justify-center items-center">
                                <FontAwesomeIcon icon={faPencil} className="text-base text-white" />
                            </div>

                            <div className="p-2 bg-red-500 rounded-lg w-10 h-10 flex justify-center items-center">
                                <FontAwesomeIcon icon={faTrash} className="text-base text-white" />
                            </div>
                        </div>

                        <h4 className="text-3xl font-bold text-center mb-10">{solution.tittle_s}</h4>

                        <div className="flex justify-center items-center gap-5">
                            <span className="text-lg font-bold px-3 cursor-pointer">Activar</span>
                            <span className="text-lg font-bold px-3 cursor-pointer">Desactivar</span>
                            <span className="block w-5 h-5 bg-green-500 rounded-full"></span>
                        </div>
                    </div>
                ))}
                <div className="flex flex-col items-center justify-center gap-10 w-full flex-1 sm:max-w-md p-5 bg-dark-purple rounded-2xl shadow-xl cursor-pointer">
                    <FontAwesomeIcon icon={faPlus} className="text-orange-500 text-7xl" />
                    <p className="text-3xl text-orange-500 font-bold">Agregar solucion</p>
                </div>
            </div>
        </AdminLayout>
    )
}
