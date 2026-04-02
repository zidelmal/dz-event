import { Module } from '@nestjs/common';
import { EstablishmentsController } from './controllers/establishments.controller';
import { EstablishmentTypesController } from './controllers/establishment-types.controller';
import { EstablishmentsService } from './services/establishments.service';
import { EstablishmentTypesService } from './services/establishment-types.service';
import { StorageModule } from '../../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [EstablishmentsController, EstablishmentTypesController],
  providers: [EstablishmentsService, EstablishmentTypesService],
})
export class EstablishmentsModule {}
