export class CreateVenueDto {
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
  venueTypeId: number;
}

export class UpdateVenueDto {
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
  venueTypeId?: number;
}
