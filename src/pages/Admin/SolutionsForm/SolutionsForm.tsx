import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AdminLayout, Input, InputFile, Textarea } from '../../../components'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Formik, FormikProps } from 'formik'
import { useMainContext } from '../../../context'
import { ISolutions } from '../../../interfaces'
import { FormImage } from '../../../interfaces/others'
import * as Yup from 'yup'


enum FormPurpose {
    EDITION = "form-edition",
    CREATION = "form-creation"
}

interface FormValues {
    tittle_s?: string,
    description_s?: string,
    active_s?: number
}

export const SolutionsForm = () => {

    const { getSolutionByID, updateSolution, createSolution, fetching, solutionByID } = useMainContext()
    const { pathname } = useLocation()
    const { id: id_solution } = useParams()
    const navigate = useNavigate()


    const [formPurpose, setFormPurpose] = useState<FormPurpose>()
    // const [solutionByID, setSolutionByID] = useState<ISolutions | null>(null)

    const [solutionImg, setSolutionImg] = useState<FormImage | null>(null)
    const [solutionImgError, setSolutionImgError] = useState<string | null>(null)

    const [solutionBanner, setSolutionBanner] = useState<FormImage | null>(null)
    const [solutionBannerError, setSolutionBannerError] = useState<string | null>(null)

    const [isToggleActive, setIsToggleActive] = useState(true)

    const solutionImgHandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        const file = target.files && target.files[0]

        if (file) {
            reader.onloadend = () => {
                setSolutionImg({
                    file,
                    imgPreviewUrl: reader.result as string
                })
            }
            reader.readAsDataURL(file)
        } else {
            setSolutionImg(null)
        }
    }

    const solutionBannerHandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        const file = target.files && target.files[0]

        if (file) {
            reader.onloadend = () => {
                setSolutionBanner({
                    file,
                    imgPreviewUrl: reader.result as string
                })
            }
            reader.readAsDataURL(file)
        } else {
            setSolutionImg(null)
        }
    }

    useEffect(() => {
        if (!pathname) return

        if (pathname.split('/')[2].startsWith("create")) setFormPurpose(FormPurpose.CREATION)
        if (pathname.split('/')[2].startsWith("edit")) setFormPurpose(FormPurpose.EDITION)

    }, [pathname])


    useEffect(() => {
        if (!id_solution) return

        getSolutionByID(Number(id_solution)).then(solution => console.log(solution))
    }, [])

    useEffect(() => {
        if(!solutionByID) return

        if(solutionByID?.active_s === 0) setIsToggleActive(false)
        if(solutionByID?.active_s === 1) setIsToggleActive(true)
    }, [solutionByID])

    useEffect(() => {
        if(solutionBanner) setSolutionBannerError(null)
        if(solutionImg) setSolutionImgError(null)
    }, [solutionImg, solutionBanner])



    if (!formPurpose) return <h1>Cargando...</h1>
    if (formPurpose === FormPurpose.EDITION && !solutionByID) return <h1>Cargando...</h1>
    if(fetching) return <h1>Cargando...</h1>

    return (
        <AdminLayout logo={false} currentPageName={formPurpose === FormPurpose.CREATION ? 'Nueva solución' : 'Editar solución'}>
            <>
                <Formik
                    initialValues={{
                        tittle_s: solutionByID ? solutionByID?.tittle_s : '',
                        description_s: solutionByID ? solutionByID?.description_s : '',
                        active_s: solutionByID ? solutionByID?.active_s : 0
                    } as FormValues}
                    validationSchema={
                        Yup.object({
                            tittle_s: Yup.string().required('Dato requerido'),
                            description_s: Yup.string().required('Dato requerido')
                        })
                    }
                    onSubmit={({ tittle_s, description_s, active_s }) => {
                        if (formPurpose === FormPurpose.CREATION) {

                            if (!solutionImg || !solutionBanner) {
                                setSolutionImgError('Debes agregar una imagen')
                                setSolutionBannerError('Debes agregar una imagen')
                                return
                            }

                            const formData = new FormData()
                            formData.append('tittle_s', tittle_s as string)
                            formData.append('description_s', description_s as string)
                            formData.append('img_s', solutionImg.file)
                            formData.append('img_banner_s', solutionBanner.file)
                            formData.append('active_s', isToggleActive ? '1' : '0')

                            createSolution(formData as ISolutions)
                            navigate(-1)
                            return
                        }

                        if (formPurpose === FormPurpose.EDITION) {
                            const formData = new FormData()
                            formData.append('tittle_s', tittle_s as string)
                            formData.append('description_s', description_s as string)
                            solutionImg && formData.append('img_s', solutionImg.file)
                            solutionBanner && formData.append('img_banner_s', solutionBanner.file)
                            formData.append('active_s', isToggleActive ? '1' : '0')

                            updateSolution(Number(id_solution), formData as ISolutions)
                        }
                    }}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        <form className="flex flex-col gap-5 max-w-2xl mx-auto mt-20 bg-white p-10 rounded-2xl" onSubmit={handleSubmit}>
                            <Input
                                type='text'
                                name='tittle_s'
                                label={'titulo'}
                                onChange={handleChange}
                                touched={touched.tittle_s}
                                errors={errors.tittle_s}
                                value={values.tittle_s}
                                className="text-black outline-none"
                            />

                            <Textarea
                                type='text'
                                name='description_s'
                                label={'descripcion'}
                                onChange={handleChange}
                                touched={touched.description_s}
                                errors={errors.description_s}
                                value={values.description_s}
                                className="text-black outline-none"
                            />

                            <InputFile
                                name='img_s'
                                label='Imagen'
                                image={solutionImg}
                                error={solutionImgError}
                                onChange={solutionImgHandleChange}
                            />

                            <InputFile
                                name='img_banner_s'
                                label='Portada'
                                image={solutionBanner}
                                error={solutionBannerError}
                                onChange={solutionBannerHandleChange}
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
            </>
        </AdminLayout>
    )
}
