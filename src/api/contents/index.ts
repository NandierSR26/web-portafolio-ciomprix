import { AxiosInstance } from 'axios';
import { IContent } from '../../interfaces';
import { ApiResponse } from '../../interfaces/api';

export default function Action(api:AxiosInstance) {
    return {
        getAllContents: () => api.get<ApiResponse>('/storages'),
        getContentById: (id:number) => api.get<ApiResponse>(`/storage/${id}`),
        getContentByCategory: (id_category:number) => api.get<ApiResponse>(`/storagesByCategory/${id_category}`),
        createContent: (data:IContent) => api.post<ApiResponse>('/create-storage', data),
        updateContent: (id:number, data:IContent) => api.put<ApiResponse>(`/update-storage/${id}`, data),
        deleteContent: (id:number) => api.delete<ApiResponse>(`/delete-storage/${id}`)
    }
}