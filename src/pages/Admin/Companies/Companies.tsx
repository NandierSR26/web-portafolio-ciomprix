import React, { useEffect } from 'react'
import { AdminCard, AdminLayout } from '../../../components'
import { useMainContext } from '../../../context'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const Companies = () => {

    const { companies, getCompanies, deleteCompany, setFetching, fetching } = useMainContext()
    const navigate = useNavigate()

    const handleDeleteCompany = (id_company: number): void => {
        setFetching(true)
        deleteCompany(id_company)
            .then(result => setFetching(false))
    }

    useEffect(() => {
        getCompanies()
        setFetching(false)
    }, [])

    if (fetching || !companies) return <h1>Cargando...</h1>

    return (
        <AdminLayout logo={false} currentPageName='Administrador de compañias'>
            <div className="flex justify-center flex-wrap gap-10 mb-20">
                {
                    companies && companies.map(company => (
                        <AdminCard
                            id={company.id}
                            key={company.id}
                            title={company.name}
                            status={company.active}
                            deleteElement={handleDeleteCompany}
                            type='company'
                        />
                    ))
                }

                <div
                    className="flex flex-col items-center justify-center gap-10 w-full flex-1 sm:max-w-md min-w-[350px] px-5 py-10 bg-dark-purple rounded-2xl shadow-xl cursor-pointer"
                    onClick={() => navigate('/admin/create-company')}
                >
                    <FontAwesomeIcon icon={faPlus} className="text-orange-500 text-7xl" />
                    <p className="text-3xl text-orange-500 font-bold">Agregar compañia</p>
                </div>
            </div>

        </AdminLayout>
    )
}
