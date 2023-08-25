import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

enum FormPurpose {
    EDITION = "form-edition",
    CREATION = "form-creation"
}

export const useFormPurpose = () => {
    const [ formPurpose, setFormPurpose ] = useState<FormPurpose>()
    const { pathname } = useLocation()

    useEffect(() => {
        if (!pathname) return

        if (pathname.split('/')[2].startsWith("create")) setFormPurpose(FormPurpose.CREATION)
        if (pathname.split('/')[2].startsWith("edit")) setFormPurpose(FormPurpose.EDITION)
    }, [pathname])

    return {
        formPurpose
    }
}