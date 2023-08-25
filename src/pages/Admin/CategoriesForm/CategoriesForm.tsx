import React, { ChangeEvent, useEffect, useState } from 'react'
import { useFormPurpose } from '../../../hooks/useFormPurpose';
import { useMainContext } from '../../../context';
import { useNavigate, useParams } from 'react-router-dom';
import { FormPurpose } from '../../../utils/enums';
import { AdminLayout, Input, InputFile, InputSelect, Textarea } from '../../../components';
import { Formik } from 'formik';
import { FormImage } from '../../../interfaces/others';
import * as Yup from 'yup'

interface FormValues {
    tittle_c: string;
    description_c: string;
    active_c: string;
    id_s: number;
}

export const CategoriesForm = () => {

    const { formPurpose } = useFormPurpose()
    const { fetching, setFetching, categoryByID, getCategoryById, createCategory, updateCategory, solutions } = useMainContext()
    const { id: id_category } = useParams()
    const navigate = useNavigate()

    const [categoryImg, setCategoryImg] = useState<FormImage | null>(null)
    const [categoryImgError, setCategoryImgError] = useState<string | null>(null)

    const [isToggleActive, setIsToggleActive] = useState(true)

    const categoryHandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        const file = target.files && target.files[0]

        if (file) {
            reader.onloadend = () => {
                setCategoryImg({
                    file,
                    imgPreviewUrl: reader.result as string
                })
            }
            reader.readAsDataURL(file)
        } else {
            setCategoryImg(null)
        }
    }

    useEffect(() => {
        if (!id_category) return

        getCategoryById(Number(id_category)).then(category => setFetching(false))
    }, [])

    useEffect(() => {
        if (!categoryByID.id) return

        if (categoryByID?.active_c === 0) setIsToggleActive(false)
        if (categoryByID?.active_c === 1) setIsToggleActive(true)
    }, [categoryByID])

    if (!formPurpose) return <h1>Cargando...</h1>
    if (formPurpose === FormPurpose.EDITION && !categoryByID.id) return <h1>Cargando...</h1>
    if (fetching) return <h1>Cargando...</h1>

    return (
        <AdminLayout logo={false} currentPageName={formPurpose === FormPurpose.CREATION ? 'Nueva categoria' : 'Editar categoria'}>
            <Formik
                initialValues={{
                    tittle_c: categoryByID.tittle_c ? categoryByID.tittle_c : '',
                    description_c: categoryByID.description_c ? categoryByID.description_c : '',
                    id_s: categoryByID.id_s ? categoryByID.id_s : '',
                    active_c: categoryByID.id ? categoryByID.active_c : ''
                } as FormValues}
                validationSchema={
                    Yup.object({
                        tittle_c: Yup.string().required('Dato requerido'),
                        description_c: Yup.string().required('Dato requerido'),
                        id_s: Yup.number().required('Dato requerido'),
                    })
                }
                onSubmit={({ tittle_c, description_c, id_s }) => {
                    if (formPurpose === FormPurpose.CREATION) {

                        if (!categoryImg) {
                            setCategoryImgError('Debes agregar una imagen')
                            return
                        }

                        const formData = new FormData()
                        formData.append('tittle_c', tittle_c as string)
                        formData.append('description_c', description_c as string)
                        formData.append('img_c', categoryImg.file)
                        formData.append('id_s', id_s.toString())
                        formData.append('active_s', isToggleActive ? '1' : '0')

                        createCategory(formData)
                        navigate(-1)
                        return
                    }

                    if (formPurpose === FormPurpose.EDITION) {
                        const formData = new FormData()
                        formData.append('tittle_c', tittle_c as string)
                        formData.append('description_c', description_c as string)
                        categoryImg && formData.append('img_c', categoryImg.file)
                        formData.append('id_s', id_s.toString())
                        formData.append('active_c', isToggleActive ? '1' : '0')

                        updateCategory(Number(id_category), formData)
                        // updateSolution(Number(id_solution), formData as ISolutions)
                    }
                }}
            >
                {({ handleChange, handleSubmit, values, touched, errors, setValues }) => (
                    <form className="flex flex-col gap-5 max-w-2xl mx-auto mt-20 bg-white p-10 rounded-2xl" onSubmit={handleSubmit}>
                        <Input
                            type='text'
                            name='tittle_c'
                            label='Titulo'
                            onChange={handleChange}
                            value={values.tittle_c}
                            touched={touched.tittle_c}
                            errors={errors.tittle_c}
                        />

                        <Textarea
                            type='text'
                            name='description_c'
                            label={'descripcion'}
                            onChange={handleChange}
                            touched={touched.description_c}
                            errors={errors.description_c}
                            value={values.description_c}
                            className="text-black outline-none"
                        />

                        <InputFile
                            name='img_c'
                            label='Imagen'
                            image={categoryImg}
                            error={categoryImgError}
                            onChange={categoryHandleChange}
                        />

                        <InputSelect
                            label='Solución'
                            options={solutions && solutions?.map(solution => ({
                                value: solution.id as number,
                                text: solution.tittle_s as string
                            }))}
                            name={'id_s'}
                            onChange={handleChange}
                            value={values.id_s}
                            errors={errors.id_s}
                            touched={touched.id_s}
                            className="bg-white border-[2px] border-solid border-gray-500 h-[50px] rounded-lg"
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
                                Desactiva
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
