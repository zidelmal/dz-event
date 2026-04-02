export class CreateEventDto {
  title: string;
  description?: string;
  type?: string;
  startDate: Date;
  endDate?: Date;
  price?: number;
  free?: boolean;
  posterUrl?: string;
  establishmentId: number;
  wilayaId: number;
  eventTypeId: number;
}

export class UpdateEventDto {
  title?: string;
  description?: string;
  type?: string;
  startDate?: Date;
  endDate?: Date;
  price?: number;
  free?: boolean;
  posterUrl?: string;
  establishmentId?: number;
  wilayaId?: number;
  eventTypeId?: number;
}
