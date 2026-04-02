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
  create(@Body() createestablishmentTypeDto: CreateEstablishmentTypeDto) {
    return this.establishmentTypesService.create(createestablishmentTypeDto);
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
    @Body() updateestablishmentTypeDto: UpdateEstablishmentTypeDto,
  ) {
    return this.establishmentTypesService.update(id, updateestablishmentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.establishmentTypesService.remove(id);
  }
}
