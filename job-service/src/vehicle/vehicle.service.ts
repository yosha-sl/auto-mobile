import { Injectable, Logger } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VehicleDTO } from "./vehicle.dto";
import { Vehicle } from "./vehicle.entity";

@Injectable()
export class VehicleService{

    private readonly logger = new Logger(VehicleService.name);
    
    // @Client({transport: Transport.TCP, options:{port: 3002}})
    // private dbService: ClientProxy;
    constructor(
        @InjectRepository(Vehicle)private vehicleRepository:Repository<Vehicle>
    ){}


    async addVehicle(data: VehicleDTO[]){
        let newList = data.map( vehicleDTO => new Vehicle(vehicleDTO));
        newList.forEach( (v: Vehicle, index) => {
            this.logger.log(`${index} First Name : ${v.firstName} | Last Name : ${v.lastName}`);
        });
        this.vehicleRepository.save(newList);
        return ;
    }
}