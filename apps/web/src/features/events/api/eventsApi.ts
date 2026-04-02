import { apiClient } from '@web/shared/utils/api';
import { type Event, type EventFilter } from '../types';

export const eventsApi = {
    createEvent: async (data: Partial<Event>, posterFile?: File): Promise<Event> => {
        let body: BodyInit;
        let headers: Record<string, string> = {};

        if (posterFile) {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });
            formData.append('poster', posterFile);
            body = formData;
        } else {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        return apiClient<Event>('/events', {
            method: 'POST',
            headers,
            body,
        });
    },

    getEvents: async (filters: EventFilter = {}): Promise<Event[]> => {
        return apiClient<Event[]>('/events', { method: 'GET' }, filters);
    },

    getEvent: async (id: number): Promise<Event> => {
        return apiClient<Event>(`/events/${id}`);
    },

    updateEvent: async (id: number, data: Partial<Event>, posterFile?: File): Promise<Event> => {
        let body: BodyInit;
        let headers: Record<string, string> = {};

        if (posterFile) {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });
            formData.append('poster', posterFile);
            body = formData;
        } else {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        return apiClient<Event>(`/events/${id}`, {
            method: 'PUT',
            headers,
            body,
        });
    },

    deleteEvent: async (id: number): Promise<void> => {
        return apiClient<void>(`/events/${id}`, { method: 'DELETE' });
    }
}
