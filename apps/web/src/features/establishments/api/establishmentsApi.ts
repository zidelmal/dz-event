import { apiClient } from '@web/shared/utils/api';
import { type Establishment, type EstablishmentFilter } from '../types';

export const establishmentsApi = {
  createEstablishment: async (data: Partial<Establishment>, imageFile?: File): Promise<Establishment> => {
    let body: BodyInit;
    let headers: Record<string, string> = {};

    if (imageFile) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      formData.append('image', imageFile);
      body = formData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    return apiClient<Establishment>('/establishments', {
      method: 'POST',
      headers,
      body,
    });
  },

  getEstablishments: (filters: EstablishmentFilter = {}): Promise<Establishment[]> => {
    return apiClient<Establishment[]>('/establishments', { method: 'GET' }, filters);
  },

  getEstablishment: (id: number): Promise<Establishment> => {
    return apiClient<Establishment>(`/establishments/${id}`);
  },

  updateEstablishment: (id: number, data: Partial<Establishment>, imageFile?: File): Promise<Establishment> => {
    let body: BodyInit;
    let headers: Record<string, string> = {};

    if (imageFile) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      formData.append('image', imageFile);
      body = formData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    return apiClient<Establishment>(`/establishments/${id}`, {
      method: 'PUT',
      headers,
      body,
    });
  },

  deleteEstablishment: (id: number): Promise<void> => {
    return apiClient<void>(`/establishments/${id}`, { method: 'DELETE' });
  }
};