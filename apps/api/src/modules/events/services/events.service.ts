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
        establishment: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  findAll() {
    return this.prisma.event.findMany({
      include: {
        establishment: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        establishment: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  findByEstablishment(establishmentId: number) {
    return this.prisma.event.findMany({
      where: { establishmentId },
      include: {
        establishment: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  findByWilaya(wilayaId: number) {
    return this.prisma.event.findMany({
      where: { wilayaId },
      include: {
        establishment: true,
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
        establishment: true,
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
