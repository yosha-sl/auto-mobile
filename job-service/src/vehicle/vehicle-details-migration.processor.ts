import { OnQueueCompleted, OnQueueProgress, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { CsvParser } from "nest-csv-parser";
import * as fs from 'fs';
import { VehicleDTO } from "./vehicle.dto";
import { VehicleService } from "./vehicle.service";
import { SocketGateway } from "src/vehicle/socket.gateway";

@Processor('vehicle_details_migration')
export class VehicleDetailsMigrationProcessor {

    private readonly logger = new Logger(VehicleDetailsMigrationProcessor.name);

    constructor(
        private readonly csvParser: CsvParser,
        private readonly vehicleService: VehicleService,
        private readonly gateway: SocketGateway
    ) { }


    @Process('migrate')
    migrateVehicleDetailsData(job: Job) {
        this.logger.log(job);
        
        const stream = fs.createReadStream(job.data.file.path, 'utf8');

        let val = { strict: true, separator: ',' };
         this.csvParser.parse(stream, VehicleDTO, undefined, undefined, val).then((res) => {
            this.vehicleService.addVehicle(res.list);
        });
    }

    @OnQueueCompleted()
    onCompleted(job: Job, result: any) {
        this.gateway.notifyUserToTranformationCompleted(job.data.userSocketId, 'Transformation Completed');
    }
}