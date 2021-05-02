import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { ormConfig } from "./orm.comfig";
import { CSVDownloadController } from './socket.controller';

@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379
    }
  }),
  VehicleModule,
  TypeOrmModule.forRoot(ormConfig),

  ],
  controllers: [CSVDownloadController],
  providers: [],
})
export class AppModule {}
