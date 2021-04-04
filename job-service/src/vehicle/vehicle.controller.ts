import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import { VehicleService } from "./vehicle.service";
import { Express } from 'express';

@Controller("files")
export class VehicleController{

    constructor(private readonly vehicleService:VehicleService){}

    @Post("csv")
    @UseInterceptors(FileInterceptor("csv", { dest: "./uploads",  }))
    uploadSingle( @UploadedFile() file, @Body() body) {
        console.log(body.skid);
        this.vehicleService.createVehicleCSVMigrationJob(file, body.skid);
    }
}