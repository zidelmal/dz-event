import { apiClient } from '../../shared/utils/api';

export type Wilaya = {
    id: number;
    name: string;
    code: number;
    createdAt: string;
    updatedAt: string;
};

export async function createWilaya(data: Partial<Wilaya>): Promise<Wilaya> {
    return apiClient<Wilaya>('/wilayas', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getWilayas(search?: string): Promise<Wilaya[]> {
    return apiClient<Wilaya[]>('/wilayas', { method: 'GET' }, { search });
}

export async function getWilaya(id: number): Promise<Wilaya> {
    return apiClient<Wilaya>(`/wilayas/${id}`);
}

export async function updateWilaya(id: number, data: Partial<Wilaya>): Promise<Wilaya> {
    return apiClient<Wilaya>(`/wilayas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteWilaya(id: number): Promise<void> {
    return apiClient<void>(`/wilayas/${id}`, { method: 'DELETE' });
}