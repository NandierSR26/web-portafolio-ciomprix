import { ReactNode, useEffect, useState } from "react"
import { MainContext } from "./MainContext"
import { api } from "../../api"
import { ICategory, ICompany, IContent, ISolutions } from "../../interfaces"

interface MainProviderProps {
    children: ReactNode
}

export const MainProvider = ({ children }: MainProviderProps) => {

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

    // SOLUTIONS
    const getSolutions = async () => {
        try {
            setFetching(true)
            const { data: { data } } = await solutionsApi.getAllSolutions()
            setSolutions(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getSolutionByID = async (id: number) => {
        try {
            setFetching(true)
            const { data: { data } } = await solutionsApi.getSolutionById(id)
            setSolutionByID(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
        }
    }

    const createSolution = async (dataValues: ISolutions) => {
        try {
            setFetching(true)
            const { data: { data } } = await solutionsApi.createSolution(dataValues)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
        }
    }

    const updateSolution = async (id: number, dataValues: ISolutions) => {
        try {
            setFetching(true)
            const { data: { data } } = await solutionsApi.updateSolution(id, dataValues)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteSolution = async (id: number) => {
        try {
            setFetching(true)
            const { data: { data } } = await solutionsApi.deleteSolution(id)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
        }
    }


    // CATEGORIES
    const getCategories = async () => {
        try {
            setFetching(true)
            const { data: { data } } = await categoriesApi.getAllCategories()
            setCategories(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const getCategoryById = async (id: number) => {
        try {
            setFetching(true)
            const { data: { data } } = await categoriesApi.getCategoryById(id)
            setCategoryById(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const getCategoryByIdSolution = async (id: number) => {
        try {
            setFetching(true)
            const { data: { data } } = await categoriesApi.getCategoryByIdSolution(id)
            setCategoriesBySolution(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const createCategory = async (dataValues: ICategory) => {
        try {
            setFetching(true)
            const { data: { data } } = await categoriesApi.createCategory(dataValues)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const updateCategory = async (id: number, dataValues: ICategory) => {
        try {
            setFetching(true)
            const { data: { data } } = await categoriesApi.updateCategory(id, dataValues)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const deleteCategory = async (id: number) => {
        try {
            setFetching(true)
            const { data: { data } } = await categoriesApi.deleteCategory(id)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }


    // CONTENIDOS
    const getContents = async () => {
        try {
            setFetching(true)
            const { data: { data } } = await contentsApi.getAllContents()
            console.log(data)
            setContents(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const getContentByID = async (id: number) => {
        try {
            setFetching(true)
            const { data: { data } } = await contentsApi.getContentById(id)
            console.log(data)
            setContentsByID(data)
            setFetching(false)
        } catch (error) {
            console.log(error);
            setFetching(false)
        }
    }

    const getContentByCategory = async (id_category: number) => {
        try {
            setFetching(true)
            const { data: { data } } = await contentsApi.getContentByCategory(id_category)
            setContentsByCategory(data)
            setFetching(false)
        } catch (error) {
            console.log(error);
            setFetching(false)
        }
    }

    const createContent = async (dataValues: IContent) => {
        try {
            setFetching(true)
            const { data: { data } } = await contentsApi.createContent(dataValues)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error);
            setFetching(false)
        }
    }

    const updateContent = async (id: number, dataValues: IContent) => {
        try {
            setFetching(true)
            const { data: { data } } = await contentsApi.updateContent(id, dataValues)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error);
            setFetching(false)
        }
    }

    const deleteContent = async (id: number) => {
        try {
            setFetching(true)
            const { data } = await contentsApi.deleteContent(id)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error);
            setFetching(false)
        }
    }


    // EMPRESAS
    const getCompanies = async () => {
        try {
            setFetching(true)
            const { data: { data } } = await companiesApi.getAllCompanies()
            console.log(data)
            setCompanies(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const getCompanyByID = async (id: number) => {
        try {
            setFetching(true)
            const { data: { data } } = await companiesApi.getCompanyById(id)
            console.log(data)
            setCompanyByID(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const createCompany = async (dataValues: ICompany) => {
        try {
            setFetching(true)
            const { data } = await companiesApi.createCompany(dataValues)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const updateCompany = async (id: number, dataValues: ICompany) => {
        try {
            setFetching(true)
            const { data } = await companiesApi.updateCompany(id, dataValues)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const deleteComany = async (id: number) => {
        try {
            setFetching(true)
            const { data } = await companiesApi.deleteCompany(id)
            console.log(data)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }


    useEffect(() => {
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
            fetching,

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
            deleteComany,

        }}>
            { children }
        </MainContext.Provider>
    )
}