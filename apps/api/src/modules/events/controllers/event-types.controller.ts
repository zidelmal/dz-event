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
import { EventTypesService } from '../services/event-types.service';
import { CreateEventTypeDto, UpdateEventTypeDto } from '../dto/event-type.dto';

@Controller('event-types')
export class EventTypesController {
  constructor(private readonly eventTypesService: EventTypesService) {}

  @Post()
  create(@Body() createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypesService.create(createEventTypeDto);
  }

  @Get()
  findAll() {
    return this.eventTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventTypesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
  ) {
    return this.eventTypesService.update(id, updateEventTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventTypesService.remove(id);
  }
}
