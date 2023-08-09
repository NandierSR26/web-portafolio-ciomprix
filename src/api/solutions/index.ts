import { AxiosInstance } from 'axios';
import { ISolutions } from '../../interfaces';
import { ApiResponse } from '../../interfaces/api';

export default function Action(api:AxiosInstance) {
    return {
        getAllSolutions: () => api.get<ApiResponse>('/solutions'),
        getSolutionById: (id:number) => api.get<ApiResponse>(`/solutions/${id}`),
        createSolution: (data:ISolutions) => api.post<ApiResponse>('/create-solution', data),
        updateSolution: (id:number, data:ISolutions) => api.put<ApiResponse>(`/update-solution/${id}`, data),
        deleteSolution: (id:number) => api.delete<ApiResponse>(`/delete-solution/${id}`)
    }
}