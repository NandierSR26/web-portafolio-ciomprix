import { AxiosInstance } from 'axios';
import { ICompany } from '../../interfaces';
import { ApiResponse } from '../../interfaces/api';

export default function Action(api:AxiosInstance) {
    return {
        getAllCompanies: () => api.get<ApiResponse>('/companies'),
        getCompanyById: (id:number) => api.get<ApiResponse>(`/company/${id}`),
        getCompanyByAlias: (alias:string) => api.get<ApiResponse>(`/companies/by-alias/${alias}`),
        createCompany: (data:FormData) => api.post<ApiResponse>('/companies', data),
        updateCompany: (id:number, data:FormData) => api.put<ApiResponse>(`/company/${id}`, data),
        deleteCompany: (id:number) => api.delete<ApiResponse>(`/company/${id}`)
    }
}