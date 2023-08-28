import React, { useEffect, useState } from 'react'
import { AdminCard, AdminLayout } from '../../../components'
import { InputSelect } from '../../../components/InputSelect'
import { useMainContext } from '../../../context'
import { IContent } from '../../../interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPencil, faPlugCirclePlus, faPlus, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export const Contents = () => {

    const { solutions, categoriesBySolution, getCategoryByIdSolution, getContentByCategory, contentsByCategory, deleteContent, fetching, setFetching } = useMainContext()

    const [selectedSolution, setSelectedSolution] = useState<number>(0)
    const [selectedCategory, setSelectedCategory] = useState<number>(0)

    const navigate = useNavigate()

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSolution(Number(e.target.value))
    }

    const handleSelectCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(Number(e.target.value))
    }

    const handleDeleteContent = (id_content: number): void => {
        deleteContent(id_content)
            .then(contents => {
                setFetching(false)
                console.log(contents)
            })
    }

    useEffect(() => {
        if (!solutions.length) return

        if (localStorage.getItem('last-selected-solution-[contents-page]')) {
            const lastSelectedSolution = JSON.parse(localStorage.getItem('last-selected-solution-[contents-page]') as string)
            setSelectedSolution(lastSelectedSolution.id)

            return
        }

        setSelectedSolution(solutions[0].id as number)
    }, [solutions])

    useEffect(() => {
        if (!categoriesBySolution.length) return

        if (localStorage.getItem('last-selected-category-[contents-page]')) {
            const lastSelectedCategory = JSON.parse(localStorage.getItem('last-selected-category-[contents-page]') as string)
            setSelectedCategory(lastSelectedCategory.id)

            return
        }

        setSelectedCategory(categoriesBySolution[0].id as number)
    }, [categoriesBySolution])

    useEffect(() => {
        if (!selectedSolution) return

        localStorage.setItem('last-selected-solution-[contents-page]', JSON.stringify({ id: selectedSolution }))

        getCategoryByIdSolution(selectedSolution)
            .then(categories => setFetching(false))
    }, [selectedSolution])

    useEffect(() => {
        if (!selectedCategory) return

        localStorage.setItem('last-selected-category-[contents-page]', JSON.stringify({ id: selectedCategory }))
        getContentByCategory(selectedCategory)
            .then(contents => setFetching(false))
    }, [selectedCategory])

    if (fetching) return <h1>Cargando...</h1>


    return (
        <AdminLayout logo={false} currentPageName='Administrador de contenidos'>
            <div className="w-full flex gap-5 justify-between">
                <InputSelect
                    options={solutions && solutions?.map(solution => ({
                        value: solution.id as number,
                        text: solution.tittle_s as string
                    }))}
                    name={'solution'}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectChange(e)}
                    value={selectedSolution ? selectedSolution : solutions[0].id}
                />

                <InputSelect
                    options={categoriesBySolution && categoriesBySolution.map(category => ({
                        text: category.tittle_c,
                        value: category.id
                    }))}
                    name={'category'}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectCategories(e)}
                    value={selectedCategory ? selectedCategory : categoriesBySolution[0]?.id}
                />
            </div>

            <section className="flex justify-start flex-wrap gap-10 my-10">
                {contentsByCategory && contentsByCategory.map(content => (
                    <AdminCard
                        key={content.id}
                        id={content.id}
                        title={content.tittle_sc}
                        status={content.active_sc}
                        type='content'
                        deleteElement={handleDeleteContent}
                    />
                ))}

                <div
                    className="flex flex-col items-center justify-center gap-10 w-full flex-1 sm:min-w-[380px] p-5 bg-dark-purple rounded-2xl shadow-xl cursor-pointer"
                    onClick={() => navigate('/admin/create-content')}
                >
                    <FontAwesomeIcon icon={faPlus} className="text-orange-500 text-center text-7xl" />
                    <p className="text-3xl text-orange-500 font-bold">Agregar contenido</p>
                </div>
            </section>
        </AdminLayout>
    )
}
