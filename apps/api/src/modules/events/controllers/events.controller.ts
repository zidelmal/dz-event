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
import { EventsService } from '../services/events.service';
import { StorageService } from '../../../storage/storage.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly storageService: StorageService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('poster'))
  async create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: any,
  ) {
    if (file) {
      createEventDto.posterUrl = await this.storageService.saveFile(file);
    }
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('wilayaId') wilayaId?: string,
    @Query('establishmentId') establishmentId?: string,
    @Query('eventTypeId') eventTypeId?: string,
    @Query('priceMax') priceMax?: string,
    @Query('free') free?: string,
  ) {
    return this.eventsService.findAll({
      search,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      wilayaId: wilayaId ? parseInt(wilayaId) : undefined,
      establishmentId: establishmentId ? parseInt(establishmentId) : undefined,
      eventTypeId: eventTypeId ? parseInt(eventTypeId) : undefined,
      priceMax: priceMax ? parseFloat(priceMax) : undefined,
      free: free ? free === 'true' : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('poster'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFile() file: any,
  ) {
    if (file) {
      updateEventDto.posterUrl = await this.storageService.saveFile(file);
    }
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }
}
