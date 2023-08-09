import { AxiosInstance } from 'axios';
import { ICompany } from '../../interfaces';
import { ApiResponse } from '../../interfaces/api';

export default function Action(api:AxiosInstance) {
    return {
        getAllCompanies: () => api.get<ApiResponse>('/companies'),
        getCompanyById: (id:number) => api.get<ApiResponse>(`/company/${id}`),
        createCompany: (data:ICompany) => api.post<ApiResponse>('/companies', data),
        updateCompany: (id:number, data:ICompany) => api.put<ApiResponse>(`/company/${id}`, data),
        deleteCompany: (id:number) => api.delete<ApiResponse>(`/company/${id}`)
    }
}