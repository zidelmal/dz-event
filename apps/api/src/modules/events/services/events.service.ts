import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEventDto) {
    return this.prisma.event.create({
      data,
      include: {
        venue: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  findAll() {
    return this.prisma.event.findMany({
      include: {
        venue: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        venue: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  findByVenue(venueId: number) {
    return this.prisma.event.findMany({
      where: { venueId },
      include: {
        venue: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  findByWilaya(wilayaId: number) {
    return this.prisma.event.findMany({
      where: { wilayaId },
      include: {
        venue: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  update(id: number, data: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data,
      include: {
        venue: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
