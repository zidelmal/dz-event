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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VenuesService } from './venues.service';
import { StorageService } from '../../storage/storage.service';
import { CreateVenueDto, UpdateVenueDto } from './dto/venue.dto';

@Controller('venues')
export class VenuesController {
  constructor(
    private readonly venuesService: VenuesService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createVenueDto: CreateVenueDto,
    @UploadedFile() file: any,
  ) {
    if (file) {
      createVenueDto.imageUrl = this.storageService.saveFile(file);
    }
    return this.venuesService.create(createVenueDto);
  }

  @Get()
  findAll() {
    return this.venuesService.findAll();
  }

  @Get('wilaya/:wilayaId')
  findByWilaya(@Param('wilayaId', ParseIntPipe) wilayaId: number) {
    return this.venuesService.findByWilaya(wilayaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.venuesService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVenueDto: UpdateVenueDto,
    @UploadedFile() file: any,
  ) {
    if (file) {
      updateVenueDto.imageUrl = this.storageService.saveFile(file);
    }
    return this.venuesService.update(id, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.venuesService.remove(id);
  }
}
