export class CreateEstablishmentDto {
  name: string;
  description?: string;
  capacity: number;
  address: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  wilayaId: number;
  establishmentTypeId: number;
}

export class UpdateEstablishmentDto {
  name?: string;
  description?: string;
  capacity?: number;
  address?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  wilayaId?: number;
  establishmentTypeId?: number;
}
