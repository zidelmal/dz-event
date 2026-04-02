export type Event = {
    id: number;
    title: string;
    description?: string;
    type?: string;
    startDate: string;
    endDate?: string;
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

export type EventType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};