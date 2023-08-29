import React, { ChangeEvent, useEffect, useState } from 'react'
import { useFormPurpose } from '../../../hooks/useFormPurpose'
import { useMainContext } from '../../../context'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminLayout, Input, InputFile, Loader } from '../../../components'
import { FormPurpose } from '../../../utils/enums'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormImage } from '../../../interfaces/others'

interface FormValues {
    nombre: string;
    alias: string;
    color1: string;
    color2: string;
    active: number
}

export const CompaniesForm = () => {

    const { formPurpose } = useFormPurpose()

    const { id: id_company } = useParams()
    const { fetching, setFetching, companyByID, getCompanyByID, createCompany, updateCompany } = useMainContext()
    const navigate = useNavigate()

    const [companyImg, setCompanyImg] = useState<FormImage | null>(null)
    const [companyImgError, setCompanyImgError] = useState<string | null>(null)

    const [isToggleActive, setIsToggleActive] = useState(true)
    const [initialValues, setInitialValues] = useState<FormValues | null>(null)

    const companyImgHandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        const file = target.files && target.files[0]

        if (file) {
            reader.onloadend = () => {
                setCompanyImg({
                    file,
                    imgPreviewUrl: reader.result as string
                })
            }
            reader.readAsDataURL(file)
        } else {
            setCompanyImg(null)
        }
    }

    useEffect(() => {
        if (!id_company) return

        getCompanyByID(Number(id_company)).then(company => setFetching(false))
        setFetching(false)
    }, [])

    useEffect(() => {
        if (!companyByID) return

        if (companyByID.active === 0) setIsToggleActive(false)
        if (companyByID.active === 1) setIsToggleActive(true)
    }, [companyByID])

    useEffect(() => {
        console.log(companyByID)
        if(!formPurpose) return

        if(formPurpose === FormPurpose.CREATION) {
            setInitialValues({
                nombre: '',
                alias: '',
                color1: '#000000',
                color2: '#000000',
                active: 0
            })
        }

        if(!companyByID.id) return

        if(formPurpose === FormPurpose.EDITION) {
            setInitialValues({
                nombre: companyByID.nombre,
                alias: companyByID.alias,
                color1: companyByID.color1,
                color2: companyByID.color2,
                active: companyByID.active
            })
        }
    }, [companyByID, formPurpose])

    useEffect(() => {
        if (companyImg) setCompanyImgError(null)
    }, [companyImg])

    if (!formPurpose || !initialValues) return <Loader />
    if(formPurpose === FormPurpose.EDITION && !companyByID) return <Loader />
    if (fetching) return <Loader />

    return (
        <AdminLayout logo={false} currentPageName={formPurpose === FormPurpose.CREATION ? 'Nueva empresa' : 'Editar empresa'}>
            <Formik
                initialValues={initialValues}
                validationSchema={
                    Yup.object({
                        nombre: Yup.string().required("Dato requerido"),
                        alias: Yup.string().required("Dato requerido"),
                    })
                }
                onSubmit={({ nombre, alias, color1, color2, active }) => {

                    if (formPurpose === FormPurpose.CREATION) {

                        if(!companyImg) {
                            setCompanyImgError("Debes seleccionar una imagen")
                            return
                        }

                        const formData = new FormData()
                        formData.append('nombre', nombre)
                        formData.append('alias', alias)
                        formData.append('logo', companyImg.file)
                        formData.append('color1', color1)
                        formData.append('color2', color2)
                        formData.append('active', isToggleActive ? '1' : '0')

                        // formData.forEach((value, key) => {
                        //     console.log({key, value})
                        // })

                        setFetching(true)
                        createCompany(formData).then(company => setFetching(false))
                        // navigate(-1)
                        return
                    }

                    if(formPurpose === FormPurpose.EDITION) {
                        const formData = new FormData()
                        formData.append('nombre', nombre)
                        formData.append('alias', alias)
                        companyImg && formData.append('logo', companyImg.file)
                        formData.append('color1', color1)
                        formData.append('color2', color2)
                        formData.append('active', isToggleActive ? '1' : '0')

                        // formData.forEach((values, key) => {
                        //     console.log({key, values})
                        // })
                        // return
                        updateCompany(Number(id_company), formData)
                    }


                }}
            >
                {({ handleChange, handleSubmit, values, touched, errors }) => (
                    <form className="flex flex-col gap-5 max-w-2xl mx-auto mt-20 bg-white p-10 rounded-2xl" onSubmit={handleSubmit}>
                        <Input
                            type='text'
                            name='nombre'
                            label={'Nombre'}
                            onChange={handleChange}
                            touched={touched.nombre}
                            errors={errors.nombre}
                            value={values.nombre}
                            className="text-black outline-none"
                        />

                        <Input
                            type='text'
                            name='alias'
                            label={'Alias'}
                            onChange={handleChange}
                            touched={touched.alias}
                            errors={errors.alias}
                            value={values.alias}
                            className="text-black outline-none"
                        />

                        <InputFile
                            name='logo'
                            label='Logo'
                            image={companyImg}
                            error={companyImgError}
                            onChange={companyImgHandleChange}
                        />

                        <Input
                            type='color'
                            name='color1'
                            label={'Color 1'}
                            onChange={handleChange}
                            touched={touched.color1}
                            errors={errors.color1}
                            value={values.color1}
                            className="text-black outline-none h-14 cursor-pointer"
                        />

                        <Input
                            type='color'
                            name='color2'
                            label={'Color 2'}
                            onChange={handleChange}
                            touched={touched.color2}
                            errors={errors.color2}
                            value={values.color2}
                            className="text-black outline-none h-14 cursor-pointer"
                        />

                        <div className="flex max-w-lg bg-gray-200 rounded-full mx-auto mt-5">
                            <div
                                className={`text-xl font-semibold text-black px-10 py-2 rounded-full cursor-pointer ${isToggleActive && 'bg-green-500 text-white'}`}
                                onClick={() => setIsToggleActive(true)}
                            >
                                Activa
                            </div>
                            <div
                                className={`text-xl font-semibold text-black px-10 py-2 rounded-full cursor-pointer ${!isToggleActive && 'bg-red-500 text-white'}`}
                                onClick={() => setIsToggleActive(false)}
                            >
                                Inactiva
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
