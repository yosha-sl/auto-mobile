import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { VehicleDetailsMigrationProcessor } from "src/vehicle/vehicle-details-migration.processor";
import { VehicleService } from "src/vehicle/vehicle.service";


@Controller("files")
export class CSVUploadController {

    // constructor(private readonly vehicleService:VehicleService){}

    // @Post("csv")
    // @UseInterceptors(FileInterceptor("csv", { dest: "./uploads" }))
    // uploadSingle(@UploadedFile() file) {
    //     console.log(file.filename); 
    //     this.vehicleService.createVehicleCSVMigrationJob(file.filename);
    // }
}