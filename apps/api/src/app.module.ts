import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { PrismaModule } from './prisma/prisma.module'
import { StorageModule } from './storage/storage.module';
import { WilayasModule } from './modules/wilaya/wilayas.module';
import { EstablishmentsModule } from './modules/establishments/establishments.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    StorageModule,
    WilayasModule,
    EstablishmentsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
