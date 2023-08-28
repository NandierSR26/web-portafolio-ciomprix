import React, { useEffect, useState } from 'react'
import { AdminCard, AdminLayout } from '../../../components'
import { ICategory, ISolutions } from '../../../interfaces'
import { useMainContext } from '../../../context'
import { InputSelect } from '../../../components/InputSelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

export const Categories = () => {

    const { solutions, getCategoryByIdSolution, deleteCategory, categoriesBySolution, fetching, setFetching } = useMainContext()
    const [selectedSolution, setSelectedSolution] = useState<number>(0)
    // const [categoriesBySolution, setCategoriesBySolution] = useState<ICategory[]>([])

    const navigate = useNavigate()

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSolution(Number(e.target.value))
    }

    const handleDeleteCategory = (id_category: number): void => {
        Swal.fire({
            title: 'Esta seguro?',
            text: "Esta accion no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCategory(id_category)
                    .then(category => {
                        toast.success('Categoria eliminada')
                    })
            }
        })
    }

    useEffect(() => {
        if (!solutions.length) return

        if (localStorage.getItem('last-selected-solution')) {
            const lastSelectedSolution = JSON.parse(localStorage.getItem('last-selected-solution') as string)
            setSelectedSolution(lastSelectedSolution.id)

            return
        }

        setSelectedSolution(solutions[0].id as number)

    }, [solutions])

    useEffect(() => {
        if (!selectedSolution) return

        localStorage.setItem('last-selected-solution', JSON.stringify({ id: selectedSolution }))
        getCategoryByIdSolution(selectedSolution)
            .then(categories => setFetching(false))
            .catch(error => setFetching(false))
    }, [selectedSolution])

    if (!solutions.length || fetching) return <h1>Cargando...</h1>

    return (
        <AdminLayout logo={false} currentPageName='Administrador de categorias'>
            <InputSelect
                options={solutions && solutions?.map(solution => ({
                    value: solution.id as number,
                    text: solution.tittle_s as string
                }))}
                name={'solution'}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectChange(e)}
                value={selectedSolution ? selectedSolution : solutions[0].id}
            />

            <section className="flex justify-center flex-wrap gap-10 mb-20 mt-10">
                {categoriesBySolution && categoriesBySolution.map(category => (
                    <AdminCard
                        key={category.id}
                        id={category.id}
                        title={category.tittle_c}
                        status={category.active_c}
                        type='category'
                        deleteElement={handleDeleteCategory}
                    />
                ))}

                <div
                    className="flex flex-col items-center justify-center gap-10 w-full flex-1 sm:max-w-md p-5 bg-dark-purple rounded-2xl shadow-xl cursor-pointer"
                    onClick={() => navigate('/admin/create-category')}
                >
                    <FontAwesomeIcon icon={faPlus} className="text-orange-500 text-7xl" />
                    <p className="text-3xl text-orange-500 font-bold">Agregar categoria</p>
                </div>
            </section>
        </AdminLayout>
    )
}
