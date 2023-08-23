import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../../../components'
import { ICategory, ISolutions } from '../../../interfaces'
import { useMainContext } from '../../../context'
import { InputSelect } from '../../../components/InputSelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export const Categories = () => {

    const { solutions, categories, getCategoryByIdSolution } = useMainContext()
    const [selectedSolution, setSelectedSolution] = useState<number>(0)
    const [categoriesBySolution, setCategoriesBySolution] = useState<ICategory[]>([])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSolution(Number(e.target.value))
    }


    useEffect(() => {
        if (!selectedSolution) return
        getCategoryByIdSolution(selectedSolution)
            .then(categories => setCategoriesBySolution(categories))
    }, [selectedSolution])


    if (!solutions.length) return

    return (
        <AdminLayout logo={false} currentPageName='Administrador de categorias'>
            <InputSelect
                options={solutions && solutions?.map(solution => ({
                    value: solution.id,
                    text: solution.tittle_s
                }))}
                name={'solution'}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectChange(e)}
                value={selectedSolution}
            />

            <section className="flex justify-start flex-wrap gap-10 my-10">
                {categoriesBySolution && categoriesBySolution.map(category => (
                    <div key={category.id} className="w-full flex-1 sm:max-w-md p-5 bg-white rounded-2xl shadow-xl">
                        <div className="flex justify-between w-full mb-16">
                            <div className="p-2 bg-blue-primary rounded-lg w-10 h-10 flex justify-center items-center">
                                <FontAwesomeIcon icon={faPencil} className="text-base text-white" />
                            </div>

                            <div className="p-2 bg-red-500 rounded-lg w-10 h-10 flex justify-center items-center">
                                <FontAwesomeIcon icon={faTrash} className="text-base text-white" />
                            </div>
                        </div>

                        <h4 className="text-3xl font-bold text-center mb-10">{category.tittle_c}</h4>

                        <div className="flex justify-center items-center gap-5">
                            <span className="text-lg font-bold px-3 cursor-pointer">Activar</span>
                            <span className="text-lg font-bold px-3 cursor-pointer">Desactivar</span>
                            <span className="block w-5 h-5 bg-green-500 rounded-full"></span>
                        </div>
                    </div>
                ))}

                <div className="flex flex-col items-center justify-center gap-10 w-full flex-1 sm:max-w-md p-5 bg-dark-purple rounded-2xl shadow-xl cursor-pointer">
                    <FontAwesomeIcon icon={faPlus} className="text-orange-500 text-7xl" />
                    <p className="text-3xl text-orange-500 font-bold">Agregar categoria</p>
                </div>
            </section>
        </AdminLayout>
    )
}
