import React from 'react'
import { AdminCard, AdminLayout } from '../../../components'
import { useMainContext } from '../../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export const Solutions = () => {

    const { solutions, deleteSolution } = useMainContext()
    const navigate = useNavigate()

    const handleDeleteSolution = (id_solution: number) => {
        deleteSolution(id_solution)
            .then(solution => {
                console.log(solution)
            })
    }

    return (
        <AdminLayout logo={false} currentPageName='Administrador de soluciónes'>
            <div className="flex justify-center flex-wrap gap-10 mb-20">
                {solutions.map(solution => (
                    <AdminCard
                        key={solution.id}
                        id={solution.id as number}
                        title={solution.tittle_s as string}
                        status={solution.active_s as number}
                        type='solution'
                        deleteElement={handleDeleteSolution}
                    />
                ))}
                <div
                    className="flex flex-col items-center justify-center gap-10 w-full flex-1 sm:max-w-md min-w-[350px] px-5 py-10 bg-dark-purple rounded-2xl shadow-xl cursor-pointer"
                    onClick={() => navigate('/admin/create-solution')}
                >
                    <FontAwesomeIcon icon={faPlus} className="text-orange-500 text-7xl" />
                    <p className="text-3xl text-orange-500 font-bold">Agregar solucion</p>
                </div>
            </div>
        </AdminLayout>
    )
}
