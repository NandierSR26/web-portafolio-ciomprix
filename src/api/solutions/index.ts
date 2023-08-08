import { AxiosInstance } from 'axios';
import { ISolutions } from '../../interfaces';

export default function Action(api:AxiosInstance) {
    return {
        getAllSolutions: () => api.get('/solutions'),
        getSolutionById: (id:number) => api.get(`/solutions/${id}`),
        createSolution: (data:ISolutions) => api.post('/create-solution', data),
        updateSolution: (id:number, data:ISolutions) => api.put(`/update-solution/${id}`, data),
        deleteSolution: (id:number) => api.delete(`/delete-solution/${id}`)
    }
}