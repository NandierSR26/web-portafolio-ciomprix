import { AxiosInstance } from 'axios';
import { IContent } from '../../interfaces';

export default function Action(api:AxiosInstance) {
    return {
        getAllContents: () => api.get('/storages'),
        getContentById: (id:number) => api.get(`/storage/${id}`),
        getContentByCategory: (id_category:number) => api.get(`/storage/${id_category}`),
        createContent: (data:IContent) => api.post('/create-storage', data),
        updateContent: (id:number, data:IContent) => api.put(`/update-storage/${id}`, data),
        deleteContent: (id:number) => api.delete(`/delete-storage/${id}`)
    }
}