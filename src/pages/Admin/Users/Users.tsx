import React, { useEffect } from 'react'
import { useMainContext } from '../../../context'
import { AdminCard, AdminLayout, Loader } from '../../../components'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

export const Users = () => {

    const { users, getUsers, fetching, setFetching, deleteUser } = useMainContext()
    const navigate = useNavigate()

    const handleDeleteUser = (id_user: number) => {
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
                deleteUser(id_user)
                    .then(user => {
                        toast.success('Usuario eliminado')
                    })
            }
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    if (fetching) return <Loader />

    return (
        <AdminLayout logo={false} currentPageName='Administrador de usuarios'>
            <div className="flex justify-center flex-wrap gap-10 mb-20">
                {
                    users.map(user => (
                        <AdminCard
                            id={user.id as number}
                            key={user.id}
                            title={user.name_u as string}
                            type='user'
                            deleteElement={handleDeleteUser}
                            status={user.active_u}
                        />
                    ))
                }

                <div
                    className="flex flex-col items-center justify-center gap-10 w-full flex-1 sm:max-w-md min-w-[350px] px-5 py-10 bg-dark-purple rounded-2xl shadow-xl cursor-pointer"
                    onClick={() => navigate('/admin/create-user')}
                >
                    <FontAwesomeIcon icon={faPlus} className="text-orange-500 text-7xl" />
                    <p className="text-3xl text-orange-500 font-bold">Agregar usuario</p>
                </div>
            </div>
        </AdminLayout>
    )
}
