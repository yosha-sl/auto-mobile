import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { VehicleService } from "./vehicle.service";

@Controller()
export class VehicleController{

    constructor(private readonly vehicleService:VehicleService){}

    @MessagePattern({ cmd: 'job' })
    getHello() {
        return this.vehicleService.addVehicle(undefined);
    }
}