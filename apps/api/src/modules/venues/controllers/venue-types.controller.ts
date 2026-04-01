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
import { VenueTypesService } from '../services/venue-types.service';
import { CreateVenueTypeDto, UpdateVenueTypeDto } from '../dto/venue-type.dto';

@Controller('venue-types')
export class VenueTypesController {
  constructor(private readonly venueTypesService: VenueTypesService) {}

  @Post()
  create(@Body() createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypesService.create(createVenueTypeDto);
  }

  @Get()
  findAll() {
    return this.venueTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.venueTypesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVenueTypeDto: UpdateVenueTypeDto,
  ) {
    return this.venueTypesService.update(id, updateVenueTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.venueTypesService.remove(id);
  }
}
