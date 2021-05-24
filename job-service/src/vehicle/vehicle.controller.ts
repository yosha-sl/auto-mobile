import { Body, Controller, Get, Header, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { VehicleService } from "./vehicle.service";
const { Parser } = require('json2csv');
import { Response } from 'express';

@Controller("files")
export class VehicleController{

    constructor(
        private readonly vehicleService:VehicleService
        ){}

    @Post("csv")
    @UseInterceptors(FileInterceptor("csv", { dest: "./uploads",  }))
    uploadSingle( @UploadedFile() file, @Body() body) {
        console.log(body.skid);
        this.vehicleService.createVehicleCSVMigrationJob(file, body.skid);
    }

    @Post("download")
    downloadCSV(@Body() body: any) {
        console.log(body.filter);
        this.vehicleService.downloadVehicleDetailsCSVJob(body.filter, body.skid);
        //this.vehicleService.callToServer(undefined, vehicleDetails.skid);
        return "OK";
    }

    @Post("readyDownload")
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment; filename=*custom_name*.csv')
    getGeneratedCSV(@Res() res: Response, @Body() vehicleDetails: any) {
        console.log('getGeneratedCSV');
        return;
    }
}