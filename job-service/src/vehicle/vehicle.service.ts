import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { Queue } from "bull";
import { Repository } from "typeorm";
import { VehicleDTO } from "./vehicle.dto";
import { Vehicle } from "./vehicle.entity";

@Injectable()
export class VehicleService{

    private readonly logger = new Logger(VehicleService.name);
    
    // @Client({transport: Transport.TCP, options:{port: 3002}})
    // private dbService: ClientProxy;
    constructor(
        @InjectQueue('vehicle_details_migration') private readonly audioQueue:Queue,
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

    createVehicleCSVMigrationJob(file){
        this.audioQueue.add('migrate',{file:file});
    }
}