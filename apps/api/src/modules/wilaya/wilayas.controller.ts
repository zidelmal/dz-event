import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { WilayasService } from './wilayas.service';
import { CreateWilayaDto, UpdateWilayaDto } from './dto/wilaya.dto';

@Controller('wilayas')
export class WilayasController {
  constructor(private readonly wilayasService: WilayasService) {}

  @Post()
  create(@Body() createWilayaDto: CreateWilayaDto) {
    return this.wilayasService.create(createWilayaDto);
  }

  @Get()
  findAll() {
    return this.wilayasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wilayasService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWilayaDto: UpdateWilayaDto,
  ) {
    return this.wilayasService.update(id, updateWilayaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wilayasService.remove(id);
  }
}
