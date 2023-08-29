import axios from "axios"
import Categories from './categories'
import Companies from './companies'
import Contents from './contents'
import Solutions from './solutions'
import Users from './users'

export const api = () => {

    const axiosConfig = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL_PROD}/api`,
        // headers: {
        //     "Content-Type": "multipart/form-data"
        // }
    })

    axiosConfig.interceptors.request.use(async (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    })

    const categoriesApi = Categories(axiosConfig)    
    const companiesApi = Companies(axiosConfig)
    const contentsApi = Contents(axiosConfig)
    const solutionsApi = Solutions(axiosConfig)
    const usersApi = Users(axiosConfig)

    return {
        categoriesApi,        
        companiesApi,        
        contentsApi,        
        solutionsApi,        
        usersApi        
    }
}