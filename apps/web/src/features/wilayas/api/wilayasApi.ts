import { apiClient } from '@web/shared/utils/api';
import { type Wilaya } from '../types';

export const wilayasApi = {
    createWilaya: async (data: Partial<Wilaya>): Promise<Wilaya> => {
        return apiClient<Wilaya>('/wilayas', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getWilayas: async (search?: string): Promise<Wilaya[]> => {
        return apiClient<Wilaya[]>('/wilayas', { method: 'GET' }, { search });
    },

    getWilaya: async (id: number): Promise<Wilaya> => {
        return apiClient<Wilaya>(`/wilayas/${id}`);
    },

    updateWilaya: async (id: number, data: Partial<Wilaya>): Promise<Wilaya> => {
        return apiClient<Wilaya>(`/wilayas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    deleteWilaya: async (id: number): Promise<void> => {
        return apiClient<void>(`/wilayas/${id}`, { method: 'DELETE' });
    }
};