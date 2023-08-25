import { AxiosInstance } from "axios";
import { ICategory } from "../../interfaces";
import { ApiResponse } from "../../interfaces/api";

export default function Action(api:AxiosInstance) {
    return {
        getAllCategories: () => api.get<ApiResponse>('/categories'),
        getCategoryById: (id:number) => api.get<ApiResponse>(`/category/${id}`),
        getCategoryByIdSolution: (id:number) => api.get<ApiResponse>(`/categoriesBySolution/${id}`),
        createCategory: (data:FormData) => api.post<ApiResponse>('/create-category', data),
        updateCategory: (id:number, data:FormData) => api.put<ApiResponse>(`/update-category/${id}`, data),
        deleteCategory: (id:number) => api.delete<ApiResponse>(`/delete-category/${id}`)
    }
}