import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { from } from 'rxjs';
import {ormConfig} from './orm.comfig'
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [VehicleModule, TypeOrmModule.forRoot(ormConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
