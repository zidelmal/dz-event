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
import { EstablishmentTypesService } from '../services/establishment-types.service';
import { CreateEstablishmentTypeDto, UpdateEstablishmentTypeDto } from '../dto/establishment-type.dto';

@Controller('establishment-types')
export class EstablishmentTypesController {
  constructor(private readonly establishmentTypesService: EstablishmentTypesService) {}

  @Post()
  create(@Body() createEstablishmentTypeDto: CreateEstablishmentTypeDto) {
    return this.establishmentTypesService.create(createEstablishmentTypeDto);
  }

  @Get()
  findAll() {
    return this.establishmentTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.establishmentTypesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstablishmentTypeDto: UpdateEstablishmentTypeDto,
  ) {
    return this.establishmentTypesService.update(id, updateEstablishmentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.establishmentTypesService.remove(id);
  }
}
