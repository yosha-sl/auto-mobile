import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { ormConfig } from "./orm.comfig";
import { JobModule } from './job/job.module';

@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379
    }
  }),
  VehicleModule,
  JobModule,
  TypeOrmModule.forRoot(ormConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
