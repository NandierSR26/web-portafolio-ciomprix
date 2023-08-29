import React, { useState, useEffect, ChangeEvent } from 'react'
import { AdminLayout, Input, InputFile, InputSelect, Loader, Textarea } from '../../../components'
import { useFormPurpose } from '../../../hooks/useFormPurpose'
import { useMainContext } from '../../../context'
import { useNavigate, useParams } from 'react-router-dom'
import { FormPurpose } from '../../../utils/enums'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormImage } from '../../../interfaces/others'

import styles from './ContentsForm.module.scss'

type VideoOptions = "video - url" | "video - file"

interface FormValues {
    tittle_sc: string;
    description_sc: string;
    vid_sc?: string;
    id_c: number
}

export const ContentsForm = () => {

    const { formPurpose } = useFormPurpose()
    const { fetching, setFetching, contentsByID, getContentByID, createContent, updateContent, categories } = useMainContext()
    const { id: id_content } = useParams()
    const navigate = useNavigate()

    const [videoOption, setVideoOption] = useState<VideoOptions>("video - file")

    const [contentImg, setContentImg] = useState<FormImage | null>(null)
    const [contentImgError, setContentImgError] = useState<string | null>(null)

    const [contentVideo, setContentVideo] = useState<FormImage | null>(null)
    const [contentVideoError, setContentVideoError] = useState<string | null>(null)

    const [contentVideoOrigin, setContentVideoOrigin] = useState(1)
    const [isToggleActive, setIsToggleActive] = useState(true)

    const [initialValues, setInitialValues] = useState<FormValues | null>(null)

    const contentHandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        const file = target.files && target.files[0]

        if (file) {
            reader.onloadend = () => {
                setContentImg({
                    file,
                    imgPreviewUrl: reader.result as string
                })
            }
            reader.readAsDataURL(file)
        } else {
            setContentImg(null)
        }
    }

    const contentVideoHandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        const file = target.files && target.files[0]

        if (file) {
            reader.onloadend = () => {
                setContentVideo({
                    file,
                    imgPreviewUrl: reader.result as string
                })
            }
            reader.readAsDataURL(file)
        } else {
            setContentVideo(null)
        }
    }

    useEffect(() => {
        if (!id_content) return

        setFetching(true)
        getContentByID(Number(id_content)).then(content => {
            setTimeout(() => {
                setFetching(false)
            }, 1000)
        })
    }, [])

    useEffect(() => {
        if (contentImg) setContentImgError(null)
        if (contentVideo) setContentVideoError(null)
    }, [contentImg, contentVideo])

    useEffect(() => {
        if (!contentsByID.id) return

        // setContentVideoOrigin(contentsByID.vid_sc_origin ? contentsByID.vid_sc_origin : 0)
        if (contentsByID.active_sc === 0) setIsToggleActive(false)
        if (contentsByID.active_sc === 1) setIsToggleActive(true)
        // console.log(contentsByID)
    }, [contentsByID])

    useEffect(() => {
        if (!formPurpose) return

        if (formPurpose === FormPurpose.CREATION) {
            setInitialValues({
                tittle_sc: '',
                description_sc: '',
                vid_sc: '',
                id_c: 0
            })
        }

        if (!contentsByID.id) return

        if (formPurpose === FormPurpose.EDITION) {
            setInitialValues({
                tittle_sc: contentsByID.tittle_sc,
                description_sc: contentsByID.description_sc,
                vid_sc: contentsByID.vid_sc,
                id_c: contentsByID.id_c,
            })
        }
    }, [formPurpose, contentsByID])

    if (!formPurpose || !initialValues) return <Loader />
    if (formPurpose === FormPurpose.EDITION && !contentsByID.id) return <Loader />
    if (fetching) return <Loader />

    return (
        <AdminLayout logo={false} currentPageName={formPurpose === FormPurpose.CREATION ? 'Nuevo contenido' : 'Editar contenido'}>
            <Formik
                initialValues={initialValues}
                validationSchema={
                    (videoOption === "video - url")
                        ? Yup.object({
                            tittle_sc: Yup.string().required("Dato requerido"),
                            description_sc: Yup.string().required("Dato requerido"),
                            vid_sc: Yup.string().required("Dato requerido"),
                            id_c: Yup.number().required("Dato requerido"),
                        })
                        : Yup.object({
                            tittle_sc: Yup.string().required("Dato requerido"),
                            description_sc: Yup.string().required("Dato requerido"),
                            id_c: Yup.number().required("Dato requerido"),
                        })
                }
                onSubmit={({ tittle_sc, description_sc, vid_sc, id_c }) => {
                    if (formPurpose === FormPurpose.CREATION) {

                        if (!contentImg) {
                            setContentImgError("Debes subir una imagen")
                            return
                        }

                        if (videoOption === 'video - file' && !contentVideo) {
                            setContentVideoError("Debes subir un video")
                            return
                        }

                        const formData = new FormData()
                        formData.append('tittle_sc', tittle_sc as string)
                        formData.append('description_sc', description_sc as string)
                        formData.append('img_sc', contentImg.file)
                        videoOption === 'video - url' ? formData.append('vid_sc', vid_sc as string) : contentVideo && formData.append('vid_sc', contentVideo?.file)
                        formData.append('active_sc', isToggleActive ? '1' : '0')
                        formData.append('id_c', id_c.toString())
                        formData.append('vid_sc_origin', contentVideoOrigin.toString())

                        // formData.forEach((value, key) => console.log({key, value}))
                        // return

                        createContent(formData)
                        navigate(-1)
                        return
                    }

                    if (formPurpose === FormPurpose.EDITION) {
                        const formData = new FormData()
                        formData.append('tittle_sc', tittle_sc as string)
                        formData.append('description_sc', description_sc as string)
                        contentImg && formData.append('img_sc', contentImg.file)
                        videoOption === 'video - url' ? formData.append('vid_sc', vid_sc as string) : contentVideo && formData.append('vid_sc', contentVideo?.file)
                        formData.append('active_sc', isToggleActive ? '1' : '0')
                        formData.append('id_c', id_c.toString())
                        formData.append('vid_sc_origin', contentVideoOrigin.toString())

                        updateContent(Number(id_content), formData)
                    }

                    console.log({ tittle_sc, description_sc, vid_sc, id_c })
                }}
            >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <form className="flex flex-col gap-5 max-w-2xl mx-auto mt-20 bg-white p-10 rounded-2xl" onSubmit={handleSubmit}>
                        <Input
                            type='text'
                            name='tittle_sc'
                            label='Título'
                            onChange={handleChange}
                            value={values.tittle_sc}
                            touched={touched.tittle_sc}
                            errors={errors.tittle_sc}
                        />

                        <Textarea
                            type='text'
                            name='description_sc'
                            label={'descripción'}
                            onChange={handleChange}
                            touched={touched.description_sc}
                            errors={errors.description_sc}
                            value={values.description_sc}
                            className="text-black outline-none"
                        />

                        <InputFile
                            name='img_sc'
                            label='Imagen'
                            image={contentImg}
                            error={contentImgError}
                            onChange={contentHandleChange}
                        />

                        <div className="w-full flex flex-col gap-1">
                            <label className="text-lg font-bold">
                                Video
                            </label>

                            <div className="w-full">
                                <div className="flex bg-gray-200 rounded-t-2xl overflow-hidden">
                                    <span
                                        className={`${styles.choose_video_option} ${videoOption === 'video - url' && "bg-blue-primary text-white"}`}
                                        onClick={() => {
                                            setVideoOption('video - url')
                                            setContentVideoOrigin(0)
                                        }}
                                    >
                                        Url
                                    </span>
                                    <span
                                        className={`${styles.choose_video_option} ${videoOption === 'video - file' && "bg-blue-primary text-white"}`}
                                        onClick={() => {
                                            setVideoOption('video - file')
                                            setContentVideoOrigin(1)
                                        }}
                                    >
                                        Archivo
                                    </span>
                                </div>

                                <div className="bg-gray-300 rounded-b-2xl p-2 h-fit">
                                    {
                                        (videoOption === 'video - file') ? (
                                            <InputFile
                                                name='vid_sc'
                                                image={contentVideo}
                                                error={contentVideoError}
                                                onChange={contentVideoHandleChange}
                                            />
                                        ) : (
                                            <Input
                                                type='text'
                                                name='vid_sc'
                                                onChange={handleChange}
                                                value={values.vid_sc}
                                                touched={touched.vid_sc}
                                                errors={errors.vid_sc}
                                                className="bg-white"
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <InputSelect
                            label='Categoría'
                            options={categories && categories?.map(category => ({
                                value: category.id as number,
                                text: category.tittle_c as string
                            }))}
                            name={'id_c'}
                            onChange={handleChange}
                            value={values.id_c}
                            errors={errors.id_c}
                            touched={touched.id_c}
                            className="bg-white border-[2px] border-solid border-gray-500 h-[50px] rounded-lg"
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
                                Inactivo
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
