import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { EventTypesController } from './controllers/event-types.controller';
import { EventsService } from './services/events.service';
import { EventTypesService } from './services/event-types.service';
import { StorageModule } from '../../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [EventsController, EventTypesController],
  providers: [EventsService, EventTypesService],
})
export class EventsModule {}
