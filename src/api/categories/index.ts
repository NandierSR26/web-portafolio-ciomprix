import { AxiosInstance } from "axios";
import { ICategory } from "../../interfaces";

export default function Action(api:AxiosInstance) {
    return {
        getAllCategories: () => api.get('/categories'),
        getCategoryById: (id:number) => api.get(`/category/${id}`),
        getCategoryByIdSolution: (id:number) => api.get(`/categoriesBySolution/${id}`),
        createCategory: (data:ICategory) => api.post('/create-category', data),
        updateCategory: (id:number, data:ICategory) => api.put(`/update-category/${id}`, data),
        deleteCategory: (id:number) => api.delete(`/delete-category/${id}`)
    }
}