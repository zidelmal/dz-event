import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { Prisma } from 'src/generated/prisma/browser';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) { }

  create(data: CreateEventDto) {

    const prismaData = this.cleanUndefined(data);
    return this.prisma.event.create({
      data: prismaData as Prisma.EventUncheckedCreateInput,
      include: {
        establishment: true,
        wilaya: true,
        eventType: true,
      },
    });
  }

  findAll(filters?: {
    search?: string;
    startDate?: Date;
    endDate?: Date;
    wilayaId?: number;
    establishmentId?: number;
    eventTypeId?: number;
    priceMax?: number;
    free?: boolean;
  }) {
    const where: any = {};

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters?.startDate) {
      where.startDate = { gte: filters.startDate };
    }

    if (filters?.endDate) {
      where.endDate = { lte: filters.endDate };
    }

    if (filters?.wilayaId) {
      where.wilayaId = filters.wilayaId;
    }

    if (filters?.establishmentId) {
      where.establishmentId = filters.establishmentId;
    }

    if (filters?.eventTypeId) {
      where.eventTypeId = filters.eventTypeId;
    }

    if (filters?.free === true) {
      where.free = true;
    } else if (filters?.priceMax !== undefined) {
      where.price = { lte: filters.priceMax };
    }

    return this.prisma.event.findMany({
      where,
      include: {
        establishment: true,
        wilaya: true,
        eventType: true,
      },
      orderBy: {
        startDate: 'asc',
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

  cleanUndefined<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
    ) as Partial<T>;
  }
}
