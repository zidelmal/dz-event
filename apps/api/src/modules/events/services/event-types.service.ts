import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEventTypeDto, UpdateEventTypeDto } from '../dto/event-type.dto';

@Injectable()
export class EventTypesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEventTypeDto) {
    return this.prisma.eventType.create({
      data,
      include: {
        events: true,
      },
    });
  }

  findAll() {
    return this.prisma.eventType.findMany({
      include: {
        events: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.eventType.findUnique({
      where: { id },
      include: {
        events: true,
      },
    });
  }

  update(id: number, data: UpdateEventTypeDto) {
    return this.prisma.eventType.update({
      where: { id },
      data,
      include: {
        events: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.eventType.delete({
      where: { id },
    });
  }
}
