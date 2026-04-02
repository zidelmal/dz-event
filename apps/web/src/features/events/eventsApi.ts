import { apiClient } from '../../shared/utils/api';

export type Event = {
    id: number;
    title: string;
    description?: string;
    type?: string;
    startDate: string;
    endDate: string;
    price?: number;
    free?: boolean;
    posterUrl?: string;
    establishmentId: number;
    wilayaId: number;
    eventTypeId: number;
    createdAt: string;
    updatedAt: string;
    establishment?: { id: number; name: string; capacity?: number; address?: string };
    wilaya?: { id: number; name: string; code?: number };
    eventType?: { id: number; name: string };
};

export type EventFilter = {
    search?: string;
    startDate?: string;
    endDate?: string;
    wilayaId?: number;
    establishmentId?: number;
    eventTypeId?: number;
    priceMax?: number;
    free?: boolean;
};

export async function createEvent(data: Partial<Event>, posterFile?: File): Promise<Event> {
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
}

export async function getEvents(filters: EventFilter = {}): Promise<Event[]> {
    return apiClient<Event[]>('/events', { method: 'GET' }, filters);
}

export async function getEvent(id: number): Promise<Event> {
    return apiClient<Event>(`/events/${id}`);
}

export async function updateEvent(id: number, data: Partial<Event>, posterFile?: File): Promise<Event> {
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
}

export async function deleteEvent(id: number): Promise<void> {
    return apiClient<void>(`/events/${id}`, { method: 'DELETE' });
}
