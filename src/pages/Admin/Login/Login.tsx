import React from 'react'
import imgBackground from '/images/login_background.jpg'
import { Input } from '../../../components'
import { Formik } from 'formik'
import * as Yup from 'yup'

import styles from './Login.module.scss'
import { useAuthContext } from '../../../context/auth/AuthContext'

export const Login = () => {

    const { onLogin } = useAuthContext()

    return (
        <>
            <main className="flex w-screen min-h-screen h-screen bg-slate-100">
                <section
                    style={{
                        backgroundImage: `url(${imgBackground})`,
                        backgroundPositionX: 'center'
                    }}
                    className="hidden lg:flex flex-1 items-center bg-cover bg-no-repeat min-h-full"
                >
                    <div className="bg-[#0000008b] w-full flex flex-col items-start py-5 px-32">
                        <h1 className="title mb-5 max-w-3xl">Panel Administrativo</h1>
                        <p className="text-xl text-white font-medium max-w-xl">Administra tus contenidos para organizar y enriquecer tu portafolio y así sorprender a tus clientes</p>
                    </div>
                </section>

                <section className="bg-blue-dark flex flex-col justify-center w-full min-h-full lg:w-[400px] p-10">
                    <Formik
                        initialValues={{
                            email: '',
                            pass: ''
                        }}
                        validationSchema={
                            Yup.object({
                                email: Yup.string().required('Dato requerido').email('Correo invalido'),
                                pass: Yup.string().required('Dato requerido')
                            })
                        }
                        onSubmit={async({email, pass}) => {
                            await onLogin({email, pass})
                        }}
                    >
                        {({ errors, touched, handleSubmit, handleChange, values }) => (

                            <form onSubmit={handleSubmit} className={`max-w-5xl mx-auto ${styles.login__login_form}`}>
                                <h2 className="text-white text-3xl font-bold text-center mb-2">Iniciar Sesión</h2>
                                <p className="text-white text-lg font-medium text-center mb-10">Ingresa con tu usuario administrativo</p>

                                <Input
                                    type='email'
                                    name='email'
                                    label='Correo'
                                    placeholder='example@gmail.com'
                                    onChange={handleChange}
                                    touched={touched.email}
                                    value={values.email}
                                    errors={errors.email}
                                />

                                <Input
                                    type='password'
                                    name='pass'
                                    label='Contraseña'
                                    placeholder='pass_123'
                                    onChange={handleChange}
                                    touched={touched.pass}
                                    value={values.pass}
                                    errors={errors.pass}
                                />

                                <button
                                    className="text-lg font-bold bg-blue-primary w-full text-center p-2 rounded-xl text-white"
                                    type='submit'
                                >
                                    Ingresar
                                </button>
                            </form>
                        )}
                    </Formik>
                </section>
            </main>
        </>
    )
}
