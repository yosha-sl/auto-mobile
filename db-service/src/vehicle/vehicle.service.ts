import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Observable } from "rxjs";
import { Repository } from "typeorm";
import { Vehicle } from "./vehicle.entity";

@Injectable()
export class VehicleService{

    constructor(
        @InjectRepository(Vehicle)private vehicleRepository:Repository<Vehicle>
    ){}

    public shakehand():Promise<Vehicle[]> {
        console.log('DB Connecting ....');
        let vehicle = new Vehicle();
        vehicle.firstName = 'Richard';
        vehicle.lastName = 'Ground';
        vehicle.model = 'Car'
        this.vehicleRepository.save(vehicle);
        return this.vehicleRepository.find();
    }
}