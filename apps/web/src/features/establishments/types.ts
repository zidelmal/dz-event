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

export type EstablishmentType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};