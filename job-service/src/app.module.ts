import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { ormConfig } from "./orm.comfig";

@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379
    }
  }),
  VehicleModule,
  TypeOrmModule.forRoot(ormConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}