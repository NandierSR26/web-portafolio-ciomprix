import React, { useEffect, useState } from 'react'
import { useFormPurpose } from '../../../hooks/useFormPurpose'
import { useMainContext } from '../../../context'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { FormPurpose } from '../../../utils/enums'
import { AdminLayout, Input } from '../../../components'
import { Formik } from 'formik'

export const UsersForm = () => {

    const { formPurpose } = useFormPurpose()
    const { fetching, setFetching, userByID, getUserByID, updateUser, createUser } = useMainContext()
    const navigate = useNavigate()
    const { id: id_user } = useParams()

    const [isToggleActive, setIsToggleActive] = useState(true)

    useEffect(() => {
        if (!id_user) return

        getUserByID(Number(id_user))
    }, [])

    useEffect(() => {
        if (!userByID.id) return

        if (userByID.active_u === 0) setIsToggleActive(false)
        if (userByID.active_u === 1) setIsToggleActive(true)
    }, [userByID])

    if (!formPurpose) return <h1>Cargando...</h1>
    if (formPurpose === FormPurpose.EDITION && !userByID.id) return <h1>Cargando...</h1>

    return (
        <AdminLayout logo={false} currentPageName={formPurpose === FormPurpose.CREATION ? 'Nuevo usuario' : 'Editar usuario'}>
            <Formik
                initialValues={{
                    name_u: userByID.name_u ? userByID.name_u : '',
                    mail_u: userByID.mail_u ? userByID.mail_u : '',
                    pass_u: ''
                }}
                validationSchema={
                    Yup.object({
                        name_u: Yup.string().required("Dato requerido"),
                        mail_u: Yup.string().required("Dato requerido"),
                        pass_u: Yup.string().required("Dato requerido")
                    })

                }
                onSubmit={({ name_u, mail_u, pass_u }) => {
                    if (formPurpose === FormPurpose.CREATION) {
                        createUser({
                            name_u,
                            mail_u,
                            pass_u,
                            active_u: isToggleActive ? 1 : 0
                        })
                        navigate(-1)
                    }

                    if (formPurpose === FormPurpose.EDITION) {
                        updateUser(Number(id_user), { name_u, mail_u, pass_u, active_u: isToggleActive ? 1 : 0 })
                    }
                }}
            >
                {({ handleChange, handleSubmit, values, touched, errors }) => (
                    <form className="flex flex-col gap-5 max-w-2xl mx-auto mt-20 bg-white p-10 rounded-2xl" onSubmit={handleSubmit}>
                        <Input
                            type='text'
                            name='name_u'
                            label={'Nombre'}
                            onChange={handleChange}
                            touched={touched.name_u}
                            errors={errors.name_u}
                            value={values.name_u}
                            className="text-black outline-none"
                        />

                        <Input
                            type='email'
                            name='mail_u'
                            label={'Correo'}
                            onChange={handleChange}
                            touched={touched.mail_u}
                            errors={errors.mail_u}
                            value={values.mail_u}
                            className="text-black outline-none"
                        />

                        <Input
                            type='password'
                            name='pass_u'
                            label={'Contraseña'}
                            onChange={handleChange}
                            touched={touched.pass_u}
                            errors={errors.pass_u}
                            value={values.pass_u}
                            className="text-black outline-none"
                        />

                        <div className="flex max-w-lg bg-gray-200 rounded-full mx-auto mt-5">
                            <div
                                className={`text-xl font-semibold text-black px-10 py-2 rounded-full cursor-pointer ${isToggleActive && 'bg-green-500 text-white'}`}
                                onClick={() => setIsToggleActive(true)}
                            >
                                Activo
                            </div>
                            <div
                                className={`text-xl font-semibold text-black px-10 py-2 rounded-full cursor-pointer ${!isToggleActive && 'bg-red-500 text-white'}`}
                                onClick={() => setIsToggleActive(false)}
                            >
                                Desactivo
                            </div>
                        </div>

                        <button type='submit' className="text-xl font-bold bg-blue-primary text-white" disabled={fetching}>
                            Guardar
                        </button>
                    </form>
                )}
            </Formik>
        </AdminLayout>
    )
}
