import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEstablishmentDto, UpdateEstablishmentDto } from '../dto/establishment.dto';

@Injectable()
export class EstablishmentsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEstablishmentDto) {
    return this.prisma.establishment.create({
      data,
      include: {
        wilaya: true,
        establishmentType: true,
        events: true,
      },
    });
  }

  findAll() {
    return this.prisma.establishment.findMany({
      include: {
        wilaya: true,
        establishmentType: true,
        events: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.establishment.findUnique({
      where: { id },
      include: {
        wilaya: true,
        establishmentType: true,
        events: true,
      },
    });
  }

  findByWilaya(wilayaId: number) {
    return this.prisma.establishment.findMany({
      where: { wilayaId },
      include: {
        wilaya: true,
        establishmentType: true,
        events: true,
      },
    });
  }

  update(id: number, data: UpdateEstablishmentDto) {
    return this.prisma.establishment.update({
      where: { id },
      data,
      include: {
        wilaya: true,
        establishmentType: true,
        events: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.establishment.delete({
      where: { id },
    });
  }
}
