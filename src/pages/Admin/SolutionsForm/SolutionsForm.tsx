import React, { useEffect, useRef, useState } from 'react'
import { AdminLayout, Input, Textarea } from '../../../components'
import { useLocation, useParams } from 'react-router-dom'
import { Formik, FormikProps } from 'formik'
import { useMainContext } from '../../../context'
import { ISolutions } from '../../../interfaces'


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

    const { getSolutionByID } = useMainContext()
    const { pathname } = useLocation()
    const { id: id_solution } = useParams()


    const [formPurpose, setFormPurpose] = useState<FormPurpose>()
    const [solutionByID, setSolutionByID] = useState<ISolutions | null>(null)

    useEffect(() => {
        if (!pathname) return

        if (pathname.split('/')[2].startsWith("create")) setFormPurpose(FormPurpose.CREATION)
        if (pathname.split('/')[2].startsWith("edit")) setFormPurpose(FormPurpose.EDITION)

    }, [pathname])


    useEffect(() => {
        if (!id_solution) return

        getSolutionByID(Number(id_solution)).then(solution => setSolutionByID(solution))
    }, [])



    if (!formPurpose) return
    if (formPurpose === FormPurpose.EDITION && !solutionByID) return null

    return (
        <AdminLayout logo={false} currentPageName={formPurpose === FormPurpose.CREATION ? 'Nueva solución' : 'Editar solución'}>
            <>
                <Formik
                    initialValues={{
                        tittle_s: solutionByID ? solutionByID?.tittle_s : '',
                        description_s: solutionByID ? solutionByID?.description_s : '',
                        active_s: solutionByID ? solutionByID?.active_s : 0
                    } as FormValues}
                    onSubmit={(values) => {
                        console.log(values)
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

                            <input type="file" />

                            

                            <button type='submit' className="text-xl font-bold bg-blue-primary text-white">
                                Guardar
                            </button>

                        </form>
                    )}
                </Formik>
            </>
        </AdminLayout>
    )
}
