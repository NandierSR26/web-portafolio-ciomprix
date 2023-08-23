import { AxiosInstance } from 'axios';
import { ILoginData, IUser } from '../../interfaces';
import { ApiResponse } from '../../interfaces/api';

export default function Action(api:AxiosInstance) {
    return {
        login: (data:ILoginData) => api.post<ApiResponse>('/login', data),
        verifyAuth: () => api.get<ApiResponse>('/verify-auth'),
        getUsers: () => api.get('/users'),
        createUser: (data:IUser) => api.post('/createUser', data),
        updateUser: (id:number, data:IUser) => api.put(`/updateUser/${id}`, data),
        deleteUser: (id:number) => api.delete(`/deleteUser/${id}`)
    }
}