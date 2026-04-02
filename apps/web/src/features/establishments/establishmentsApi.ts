import { apiClient } from '../../shared/utils/api';

export type EstablishmentFilter = {
  search?: string;
  wilayaId?: number;
  establishmentTypeId?: number;
  capacityMin?: number;
};

export type Establishment = {
  id: number;
  name: string;
  description?: string;
  capacity?: number;
  address: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  wilayaId: number;
  establishmentTypeId: number;
  createdAt: string;
  updatedAt: string;
};

export async function createEstablishment(data: Partial<Establishment>, imageFile?: File): Promise<Establishment> {
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
}

export async function getEstablishments(filters: EstablishmentFilter = {}): Promise<Establishment[]> {
  return apiClient<Establishment[]>('/establishments', { method: 'GET' }, filters);
}

export async function getEstablishment(id: number): Promise<Establishment> {
  return apiClient<Establishment>(`/establishments/${id}`);
}

export async function updateEstablishment(id: number, data: Partial<Establishment>, imageFile?: File): Promise<Establishment> {
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
}

export async function deleteEstablishment(id: number): Promise<void> {
  return apiClient<void>(`/establishments/${id}`, { method: 'DELETE' });
}
