import { AxiosInstance } from 'axios';
import { ILoginData, IRegisterUserData, IUser } from '../../interfaces';
import { ApiResponse } from '../../interfaces/api';

export default function Action(api:AxiosInstance) {
    return {
        login: (data:ILoginData) => api.post<ApiResponse>('/login', data),
        verifyAuth: () => api.get<ApiResponse>('/verify-auth'),
        getUsers: () => api.get<ApiResponse>('/users'),
        getUserByID: (id_user:number) => api.get<ApiResponse>(`/users/${id_user}`),
        createUser: (data:IRegisterUserData) => api.post<ApiResponse>('/createUser', data),
        updateUser: (id:number, data:IRegisterUserData) => api.put<ApiResponse>(`/updateUser/${id}`, data),
        deleteUser: (id:number) => api.delete<ApiResponse>(`/deleteUser/${id}`)
    }
}