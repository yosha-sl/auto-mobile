import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  
  constructor(@InjectRepository(Vehicle)private readonly vehicleRepository:Repository<Vehicle>){}

  create(vehicleDTO: CreateVehicleInput) {
    const newVehicle = this.vehicleRepository.create(vehicleDTO);
    return this.vehicleRepository.save(newVehicle);
  }

  findAll() {
    return this.vehicleRepository.find();
  }

  findOne(id: number) {
    return this.vehicleRepository.findOneOrFail(id);
  }

  update(id: number, updateVehicleInput: UpdateVehicleInput) {
    const updatedVehicle = this.vehicleRepository.create(updateVehicleInput);
    return this.vehicleRepository.update(id, updatedVehicle);
  }

  remove(id: number) {
    return this.vehicleRepository.delete(id);
  }

}
