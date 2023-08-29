import { ReactNode, useEffect, useState } from "react"
import { MainContext } from "./MainContext"
import { api } from "../../api"
import { ICategory, ICompany, IContent, IRegisterUserData, ISolutions, IUser } from "../../interfaces"
import toast from 'react-hot-toast'
import { useLocation } from "react-router-dom"

interface MainProviderProps {
    children: ReactNode
}

export const MainProvider = ({ children }: MainProviderProps) => {

    const { pathname } = useLocation()

    const { categoriesApi, companiesApi, contentsApi, solutionsApi, usersApi } = api()

    const [fetching, setFetching] = useState(true)

    const [solutions, setSolutions] = useState<ISolutions[]>([])
    const [solutionByID, setSolutionByID] = useState<ISolutions>({} as ISolutions)

    const [categories, setCategories] = useState<ICategory[]>([])
    const [categoryByID, setCategoryById] = useState<ICategory>({} as ICategory)
    const [categoriesBySolution, setCategoriesBySolution] = useState<ICategory[]>([])

    const [contents, setContents] = useState<IContent[]>([])
    const [contentsByID, setContentsByID] = useState<IContent>({} as IContent)
    const [contentsByCategory, setContentsByCategory] = useState<IContent[]>([])

    const [companies, setCompanies] = useState<ICompany[]>([])
    const [companyByID, setCompanyByID] = useState<ICompany>({} as ICompany)
    const [companyByAlias, setCompanyByAlias] = useState<ICompany>({} as ICompany)

    const [users, setUsers] = useState<IUser[]>([])
    const [userByID, setUserByID] = useState<IUser>({} as IUser)

    const [videoModalOpen, setVideoModalOpen] = useState(false)
    const [videoContentUrl, setVideoContentUrl] = useState<string | null>(null)

    // SOLUTIONS
    const getSolutions = async () => {
        try {
            const { data: { data } } = await solutionsApi.getAllSolutions()
            setSolutions(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getSolutionByID = async (id: number): Promise<ISolutions> => {
        try {
            const { data: { data } } = await solutionsApi.getSolutionById(id)
            setSolutionByID(data)
            return data
        } catch (error) {
            console.log(error)
            return {} as ISolutions
        }
    }

    const createSolution = async (dataValues: FormData) => {

        try {
            const { data: { data, message } } = await solutionsApi.createSolution(dataValues)
            setSolutions([...solutions, data])
            toast.success(message)
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    const updateSolution = async (id: number, dataValues: FormData) => {
        setSolutionByID({} as ISolutions)
        try {
            const { data: { data, message } } = await solutionsApi.updateSolution(id, dataValues)

            // actualizar el arreglo de soluciones
            const index = solutions.findIndex(solution => solution.id === data.id)
            if (index === -1) return
            solutions[index] = data

            // actualizar en el estado la solucion con los nuevos datos
            setSolutionByID(data)
            toast.success(message)

        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    const deleteSolution = async (id: number) => {
        try {
            const { data: { data, message } } = await solutionsApi.deleteSolution(id)

            const newSolutions = solutions.filter(solution => solution.id !== id)
            setSolutions(newSolutions)
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }


    // CATEGORIES
    const getCategories = async () => {
        try {
            const { data: { data } } = await categoriesApi.getAllCategories()
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategoryById = async (id: number) => {
        try {
            const { data: { data } } = await categoriesApi.getCategoryById(id)
            setCategoryById(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategoryByIdSolution = async (id: number): Promise<ICategory[]> => {
        try {
            const { data: { data } } = await categoriesApi.getCategoryByIdSolution(id)
            setCategoriesBySolution(data)
            return data
        } catch (error) {
            console.log(error)
            return []
        }
    }

    const createCategory = async (dataValues: FormData) => {
        try {
            const { data: { data, message } } = await categoriesApi.createCategory(dataValues)
            setCategories([...categories, data])

            toast.success(message)
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    const updateCategory = async (id: number, dataValues: FormData) => {
        try {
            const { data: { data, message } } = await categoriesApi.updateCategory(id, dataValues)
            console.log(data)

            const index = categoriesBySolution.findIndex(category => category.id === data.id)
            if (index === -1) return
            categoriesBySolution[index] = data

            setCategoryById(data)
            toast.success(message)
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    const deleteCategory = async (id: number) => {
        try {
            const { data: { data } } = await categoriesApi.deleteCategory(id)

            const newCategories = categoriesBySolution.filter(category => category.id !== id)
            setCategoriesBySolution(newCategories)
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }


    // CONTENIDOS
    const getContents = async () => {
        try {
            const { data: { data } } = await contentsApi.getAllContents()
            setContents(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getContentByID = async (id: number) => {
        try {
            const { data: { data } } = await contentsApi.getContentById(id)
            console.log(data)
            setContentsByID(data)
        } catch (error) {
            console.log(error);
        }
    }

    const getContentByCategory = async (id_category: number) => {
        try {
            const { data: { data } } = await contentsApi.getContentByCategory(id_category)
            setContentsByCategory(data)
        } catch (error) {
            console.log(error);
        }
    }

    const createContent = async (dataValues: FormData) => {
        try {
            const { data: { data, message } } = await contentsApi.createContent(dataValues)
            console.log(data)
            setContentsByCategory([...contentsByCategory, data])
            toast.success(message)
        } catch (error) {
            console.log(error);
            toast.error('Algo salio mal')
        }
    }

    const updateContent = async (id: number, dataValues: FormData) => {
        try {
            const { data: { data, message } } = await contentsApi.updateContent(id, dataValues)
            console.log(data)

            const index = contentsByCategory.findIndex(content => content.id === data.id)
            if (index === -1) return
            contentsByCategory[index] = data

            setContentsByID(data)
            toast.success(message)

        } catch (error) {
            console.log(error);
            toast.error('Algo salio mal')
        }
    }

    const deleteContent = async (id: number) => {
        try {
            const { data } = await contentsApi.deleteContent(id)
            const newContents = contentsByCategory.filter(content => content.id !== id)
            setContentsByCategory(newContents)
        } catch (error) {
            console.log(error);
        }
    }


    // EMPRESAS
    const getCompanies = async () => {
        try {
            const { data: { data } } = await companiesApi.getAllCompanies()
            setCompanies(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCompanyByID = async (id: number) => {
        try {
            const { data: { data } } = await companiesApi.getCompanyById(id)
            setCompanyByID(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCompanyByAlias = async (alias: string) => {
        try {
            const { data: { data } } = await companiesApi.getCompanyByAlias(alias)
            console.log(data)
            setCompanyByAlias(data)
        } catch (error) {
            console.log(error);
        }
    }

    const createCompany = async (dataValues: FormData) => {
        try {
            const { data: { data, message } } = await companiesApi.createCompany(dataValues)
            setCompanies([...companies, data])
            toast.success(message)
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    const updateCompany = async (id: number, dataValues: FormData) => {
        try {
            const { data: { data, message } } = await companiesApi.updateCompany(id, dataValues)

            const index = companies.findIndex(company => company.id === data.id)
            companies[index] = data

            setCompanyByID(data)
            toast.success(message)
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    const deleteCompany = async (id: number) => {
        try {
            const { data } = await companiesApi.deleteCompany(id)

            setCompanies(companies.filter(company => company.id !== id))
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    // USUARIOS
    const getUsers = async () => {
        try {
            const { data: { data } } = await usersApi.getUsers()
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getUserByID = async (id_user: number) => {
        try {
            const { data: { data } } = await usersApi.getUserByID(id_user)
            setUserByID(data)
        } catch (error) {
            console.log(error);
        }
    }

    const createUser = async (dataValues: IRegisterUserData) => {
        try {
            const { data: { data, message } } = await usersApi.createUser(dataValues)
            setUsers([...users, data])
            toast.success(message)
        } catch (error) {
            console.log(error);
            toast.error('Algo salio mal')
        }
    }

    const updateUser = async (id_user: number, dataValues: IRegisterUserData) => {
        try {
            const { data: { data, message } } = await usersApi.updateUser(id_user, dataValues)

            const index = users.findIndex(user => user.id === data.id)
            if (index === -1) return
            users[index] = data

            setUserByID(data)
            toast.success(message)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id: number) => {
        try {
            const { data } = await usersApi.deleteUser(id)

            const newUsers = users.filter(user => user.id !== id)
            setUsers(newUsers)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getSolutions()
        getCategories()
        getCompanies()
    }, [])

    // useEffect(() => {
    //     if (pathname.includes('/admin/create')) {
    //         setSolutionByID({} as ISolutions)
    //         setCategoryById({} as ICategory)
    //         setContentsByID({} as IContent)
    //         setCompanyByID({} as ICompany)
    //         setUserByID({} as IUser)
    //     }
    // }, [pathname])

    return (
        <MainContext.Provider value={{
            solutions,
            solutionByID,
            categories,
            categoryByID,
            categoriesBySolution,
            contents,
            contentsByID,
            contentsByCategory,
            companies,
            companyByID,
            companyByAlias,
            users,
            userByID,
            fetching,
            videoModalOpen,
            videoContentUrl,

            setFetching,
            setVideoContentUrl,
            setVideoModalOpen,
            getSolutions,
            getSolutionByID,
            createSolution,
            updateSolution,
            deleteSolution,
            getCategories,
            getCategoryById,
            getCategoryByIdSolution,
            createCategory,
            updateCategory,
            deleteCategory,
            getContents,
            getContentByID,
            getContentByCategory,
            createContent,
            updateContent,
            deleteContent,
            getCompanies,
            getCompanyByID,
            getCompanyByAlias,
            createCompany,
            updateCompany,
            deleteCompany,
            getUsers,
            getUserByID,
            createUser,
            updateUser,
            deleteUser,
        }}>
            {children}
        </MainContext.Provider>
    )
}