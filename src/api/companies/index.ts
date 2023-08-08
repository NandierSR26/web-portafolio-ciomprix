import { AxiosInstance } from 'axios';
import { ICompany } from '../../interfaces';

export default function Action(api:AxiosInstance) {
    return {
        getAllCompanies: () => api.get('/companies'),
        getCompanyById: (id:number) => api.get(`/company/${id}`),
        createCompany: (data:ICompany) => api.post('/companies', data),
        updateCompany: (id:number, data:ICompany) => api.put(`/company/${id}`, data),
        deleteCompany: (id:number) => api.delete(`/company/${id}`)
    }
}