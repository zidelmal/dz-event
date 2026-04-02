import { apiClient } from '../../shared/utils/api';

export type EventType = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export async function getEventTypes(): Promise<EventType[]> {
  return apiClient<EventType[]>('/event-types', { method: 'GET' });
}
