import { ReactNode, useEffect, useState } from "react"
import { MainContext } from "./MainContext"
import { api } from "../../api"
import { ICategory, ICompany, IContent, IRegisterUserData, ISolutions, IUser } from "../../interfaces"

interface MainProviderProps {
    children: ReactNode
}

export const MainProvider = ({ children }: MainProviderProps) => {

    const { categoriesApi, companiesApi, contentsApi, solutionsApi, usersApi } = api()

    const [fetching, setFetching] = useState(true)

    const [solutions, setSolutions] = useState<ISolutions[]>([])
    const [solutionByID, setSolutionByID] = useState<ISolutions>()

    const [categories, setCategories] = useState<ICategory[]>([])
    const [categoryByID, setCategoryById] = useState<ICategory>({} as ICategory)
    const [categoriesBySolution, setCategoriesBySolution] = useState<ICategory[]>([])

    const [contents, setContents] = useState<IContent[]>([])
    const [contentsByID, setContentsByID] = useState<IContent>({} as IContent)
    const [contentsByCategory, setContentsByCategory] = useState<IContent[]>([])

    const [companies, setCompanies] = useState<ICompany[]>([])
    const [companyByID, setCompanyByID] = useState<ICompany>({} as ICompany)

    const [users, setUsers] = useState<IUser[]>([])
    const [userByID, setUserByID] = useState<IUser>({} as IUser)

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
            return {}
        }
    }

    const createSolution = async (dataValues: ISolutions) => {

        try {
            const { data: { data } } = await solutionsApi.createSolution(dataValues)
            setSolutions([...solutions, data])
        } catch (error) {
            console.log(error)
        }
    }

    const updateSolution = async (id: number, dataValues: ISolutions) => {
        setSolutionByID({} as ISolutions)
        try {
            const { data: { data } } = await solutionsApi.updateSolution(id, dataValues)

            // actualizar el arreglo de soluciones
            const index = solutions.findIndex(solution => solution.id === data.id)
            if (index === -1) return
            solutions[index] = data

            // actualizar en el estado la solucion con los nuevos datos
            setSolutionByID(data)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteSolution = async (id: number) => {
        try {
            const { data: { data } } = await solutionsApi.deleteSolution(id)
            console.log(data)
        } catch (error) {
            console.log(error)
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
            const { data: { data } } = await categoriesApi.createCategory(dataValues)
            // setCategories([...categories, data])
        } catch (error) {
            console.log(error)
        }
    }

    const updateCategory = async (id: number, dataValues: FormData) => {
        try {
            const { data: { data } } = await categoriesApi.updateCategory(id, dataValues)
            console.log(data)

            const index = categoriesBySolution.findIndex(category => category.id === data.id)
            if (index === -1) return
            categoriesBySolution[index] = data

            setCategoryById(data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCategory = async (id: number) => {
        try {
            const { data: { data } } = await categoriesApi.deleteCategory(id)
            console.log(data)
        } catch (error) {
            console.log(error)
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
            const { data: { data } } = await contentsApi.createContent(dataValues)
            console.log(data)
            setContentsByCategory([...contentsByCategory, data])
        } catch (error) {
            console.log(error);
        }
    }

    const updateContent = async (id: number, dataValues: FormData) => {
        try {
            const { data: { data } } = await contentsApi.updateContent(id, dataValues)
            console.log(data)

            const index = contentsByCategory.findIndex(content => content.id === data.id)
            if (index === -1) return
            contentsByCategory[index] = data

            setContentsByID(data)

        } catch (error) {
            console.log(error);
        }
    }

    const deleteContent = async (id: number) => {
        try {
            const { data } = await contentsApi.deleteContent(id)
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }


    // EMPRESAS
    const getCompanies = async () => {
        try {
            const { data: { data } } = await companiesApi.getAllCompanies()
            console.log(data)
            setCompanies(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCompanyByID = async (id: number) => {
        try {
            const { data: { data } } = await companiesApi.getCompanyById(id)
            console.log(data)
            setCompanyByID(data)
        } catch (error) {
            console.log(error)
        }
    }

    const createCompany = async (dataValues: FormData) => {
        try {
            const { data } = await companiesApi.createCompany(dataValues)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const updateCompany = async (id: number, dataValues: FormData) => {
        try {
            const { data } = await companiesApi.updateCompany(id, dataValues)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCompany = async (id: number) => {
        try {
            const { data } = await companiesApi.deleteCompany(id)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    // USUARIOS
    const getUsers = async () => {
        try {
            const { data: { data } } = await usersApi.getUsers()
            console.log(data)
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getUserByID = async (id_user: number) => {
        try {
            const { data: { data } } = await usersApi.getUserByID(id_user)
            console.log(data)
            setUserByID(data)
        } catch (error) {
            console.log(error);
        }
    }

    const createUser = async (dataValues: IRegisterUserData) => {
        try {
            const { data: { data } } = await usersApi.createUser(dataValues)
            console.log(data)
            setUsers([...users, data])
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (id_user: number, dataValues: IRegisterUserData) => {
        try {
            const { data: { data } } = await usersApi.updateUser(id_user, dataValues)
            console.log(data)

            const index = users.findIndex(user => user.id === data.id)
            if (index === -1) return
            users[index] = data

            setUserByID(data)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id: number) => {
        try {
            const { data } = await usersApi.deleteUser(id)
            console.log(data)

            const newUsers = users.filter( user => user.id !== id)
            setUsers(newUsers)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getSolutions()
        getCategories()
    }, [])

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
            users,
            userByID,
            fetching,

            setFetching,
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