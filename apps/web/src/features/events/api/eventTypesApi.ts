import { apiClient } from '@web/shared/utils/api';
import { type EventType } from '../types';

export const eventTypesApi = {
  createEventType: async (data: Partial<EventType>): Promise<EventType> => {
    return apiClient<EventType>('/event-types', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getEventTypes: (): Promise<EventType[]> => {
    return apiClient<EventType[]>('/event-types', { method: 'GET' });
  },

  getEventType: (id: number): Promise<EventType> => {
    return apiClient<EventType>(`/event-types/${id}`);
  },

  updateEventType: (id: number, data: Partial<EventType>): Promise<EventType> => {
    return apiClient<EventType>(`/event-types/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteEventType: (id: number): Promise<void> => {
    return apiClient<void>(`/event-types/${id}`, { method: 'DELETE' });
  }
}
