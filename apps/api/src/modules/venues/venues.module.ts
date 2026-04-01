import { Module } from '@nestjs/common';
import { VenuesController } from './controllers/venues.controller';
import { VenueTypesController } from './controllers/venue-types.controller';
import { VenuesService } from './services/venues.service';
import { VenueTypesService } from './services/venue-types.service';
import { StorageModule } from '../../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [VenuesController, VenueTypesController],
  providers: [VenuesService, VenueTypesService],
})
export class VenuesModule {}
