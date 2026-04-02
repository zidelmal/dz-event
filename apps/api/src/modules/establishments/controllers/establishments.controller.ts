import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EstablishmentsService } from '../services/establishments.service';
import { StorageService } from '../../../storage/storage.service';
import { CreateEstablishmentDto, UpdateEstablishmentDto } from '../dto/establishment.dto';

@Controller('establishments')
export class EstablishmentsController {
  constructor(
    private readonly establishmentsService: EstablishmentsService,
    private readonly storageService: StorageService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createEstablishmentDto: CreateEstablishmentDto,
    @UploadedFile() file: any,
  ) {
    if (file) {
      createEstablishmentDto.imageUrl = await this.storageService.saveFile(file);
    }
    return this.establishmentsService.create(createEstablishmentDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('wilayaId') wilayaId?: string,
    @Query('establishmentTypeId') establishmentTypeId?: string,
    @Query('capacityMin') capacityMin?: string,
  ) {
    return this.establishmentsService.findAll({
      search,
      wilayaId: wilayaId ? parseInt(wilayaId) : undefined,
      establishmentTypeId: establishmentTypeId ? parseInt(establishmentTypeId) : undefined,
      capacityMin: capacityMin ? parseInt(capacityMin) : undefined,
    });
  }

  @Get('wilaya/:wilayaId')
  findByWilaya(@Param('wilayaId', ParseIntPipe) wilayaId: number) {
    return this.establishmentsService.findByWilaya(wilayaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.establishmentsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
    @UploadedFile() file: any,
  ) {
    if (file) {
      updateEstablishmentDto.imageUrl = await this.storageService.saveFile(file);
    }
    return this.establishmentsService.update(id, updateEstablishmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.establishmentsService.remove(id);
  }
}
