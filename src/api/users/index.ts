import { AxiosInstance } from 'axios';
import { ILoginData, IUser } from '../../interfaces';

export default function Action(api:AxiosInstance) {
    return {
        login: (data:ILoginData) => api.post('/login'),
        getUsers: () => api.get('/users'),
        createUser: (data:IUser) => api.post('/createUser', data),
        updateUser: (id:number, data:IUser) => api.put(`/updateUser/${id}`, data),
        deleteUser: (id:number) => api.delete(`/deleteUser/${id}`)
    }
}