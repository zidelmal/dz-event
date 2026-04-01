import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateVenueTypeDto, UpdateVenueTypeDto } from '../dto/venue-type.dto';

@Injectable()
export class VenueTypesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateVenueTypeDto) {
    return this.prisma.venueType.create({
      data,
      include: {
        venues: true,
      },
    });
  }

  findAll() {
    return this.prisma.venueType.findMany({
      include: {
        venues: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.venueType.findUnique({
      where: { id },
      include: {
        venues: true,
      },
    });
  }

  update(id: number, data: UpdateVenueTypeDto) {
    return this.prisma.venueType.update({
      where: { id },
      data,
      include: {
        venues: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.venueType.delete({
      where: { id },
    });
  }
}
