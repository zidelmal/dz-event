import { apiClient } from '@web/shared/utils/api';
import { type EstablishmentType } from '../types';

export const establishmentTypesApi = {
  createEstablishmentType: async (data: Partial<EstablishmentType>): Promise<EstablishmentType> => {
    return apiClient<EstablishmentType>('/establishment-types', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getEstablishmentTypes: (): Promise<EstablishmentType[]> => {
    return apiClient<EstablishmentType[]>('/establishment-types', { method: 'GET' });
  },

  getEstablishmentType: (id: number): Promise<EstablishmentType> => {
    return apiClient<EstablishmentType>(`/establishment-types/${id}`);
  },

  updateEstablishmentType: (id: number, data: Partial<EstablishmentType>): Promise<EstablishmentType> => {
    return apiClient<EstablishmentType>(`/establishment-types/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteEstablishmentType: (id: number): Promise<void> => {
    return apiClient<void>(`/establishment-types/${id}`, { method: 'DELETE' });
  }
}
