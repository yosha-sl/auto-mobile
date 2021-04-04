import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import { VehicleService } from "./vehicle.service";
import { Express } from 'express';

@Controller("files")
export class VehicleController{

    constructor(private readonly vehicleService:VehicleService){}

    @Post("csv")
    @UseInterceptors(FileInterceptor("csv", { dest: "./uploads",  }))
    uploadSingle( @UploadedFile() file) {
        this.vehicleService.createVehicleCSVMigrationJob(file);
    }
}