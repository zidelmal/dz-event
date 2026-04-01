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
import { EventsService } from '../services/events.service';
import { StorageService } from '../../../storage/storage.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('poster'))
  async create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: any,
  ) {
    if (file) {
      createEventDto.posterUrl = this.storageService.saveFile(file);
    }
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('venue/:venueId')
  findByVenue(@Param('venueId', ParseIntPipe) venueId: number) {
    return this.eventsService.findByVenue(venueId);
  }

  @Get('wilaya/:wilayaId')
  findByWilaya(@Param('wilayaId', ParseIntPipe) wilayaId: number) {
    return this.eventsService.findByWilaya(wilayaId);
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
      updateEventDto.posterUrl = this.storageService.saveFile(file);
    }
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }
}
