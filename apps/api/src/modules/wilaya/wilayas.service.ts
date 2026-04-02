import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWilayaDto, UpdateWilayaDto } from './dto/wilaya.dto';

@Injectable()
export class WilayasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateWilayaDto) {
    return this.prisma.wilaya.create({ data });
  }

  findAll() {
    return this.prisma.wilaya.findMany({
      include: {
        establishments: true,
        events: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.wilaya.findUnique({
      where: { id },
      include: {
        establishments: true,
        events: true,
      },
    });
  }

  update(id: number, data: UpdateWilayaDto) {
    return this.prisma.wilaya.update({
      where: { id },
      data,
      include: {
        establishments: true,
        events: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.wilaya.delete({
      where: { id },
    });
  }
}
