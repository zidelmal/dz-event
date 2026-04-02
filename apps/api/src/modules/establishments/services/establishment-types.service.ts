import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEstablishmentTypeDto, UpdateEstablishmentTypeDto } from '../dto/establishment-type.dto';

@Injectable()
export class EstablishmentTypesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEstablishmentTypeDto) {
    return this.prisma.establishmentType.create({
      data,
      include: {
        establishments: true,
      },
    });
  }

  findAll() {
    return this.prisma.establishmentType.findMany({
      include: {
        establishments: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.establishmentType.findUnique({
      where: { id },
      include: {
        establishments: true,
      },
    });
  }

  update(id: number, data: UpdateEstablishmentTypeDto) {
    return this.prisma.establishmentType.update({
      where: { id },
      data,
      include: {
        establishments: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.establishmentType.delete({
      where: { id },
    });
  }
}
