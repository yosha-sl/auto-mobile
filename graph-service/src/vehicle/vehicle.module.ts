import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { AppService } from 'src/app.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  providers: [VehicleResolver, VehicleService, AppService],
  exports: [VehicleService],
  controllers: []
})
export class VehicleModule {}
