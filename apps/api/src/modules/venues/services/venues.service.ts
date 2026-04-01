import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateVenueDto, UpdateVenueDto } from '../dto/venue.dto';

@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateVenueDto) {
    return this.prisma.venue.create({
      data,
      include: {
        wilaya: true,
        venueType: true,
        events: true,
      },
    });
  }

  findAll() {
    return this.prisma.venue.findMany({
      include: {
        wilaya: true,
        venueType: true,
        events: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.venue.findUnique({
      where: { id },
      include: {
        wilaya: true,
        venueType: true,
        events: true,
      },
    });
  }

  findByWilaya(wilayaId: number) {
    return this.prisma.venue.findMany({
      where: { wilayaId },
      include: {
        wilaya: true,
        venueType: true,
        events: true,
      },
    });
  }

  update(id: number, data: UpdateVenueDto) {
    return this.prisma.venue.update({
      where: { id },
      data,
      include: {
        wilaya: true,
        venueType: true,
        events: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.venue.delete({
      where: { id },
    });
  }
}
