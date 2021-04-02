import { Controller, Get } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { VehicleService } from "./vehicle.service";

@Controller()
export class VehicleController{

    constructor(
        private readonly vehicleService:VehicleService
    ){}

    @MessagePattern({ cmd: 'trams' })
    public findAll() {
        console.log("This is a DB service Vehicle Controller");
        // console.log(data);
        // let val = this..shakehand();
        // console.log(val);
        return ;
    } 
}