import { InjectQueue, OnQueueCompleted, OnQueueProgress, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job, Queue } from "bull";
import { CsvParser, ParsedData } from "nest-csv-parser";
import * as fs from 'fs';
import { VehicleDTO } from "./vehicle.dto";
import { VehicleService } from "./vehicle.service";
import * as path from 'path';
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
        // this.logger.log(`${path.join(__dirname, '..', '..','upload',job.data.fileName)}`); 

        // const location = `D:/Development/Projects/auto-mobile/job-service/uploads/v1`;

        //temporary save on as local file. file need to be persistace for future audits

        const stream = fs.createReadStream(job.data.file.path, 'utf8');

        let val = { strict: true, separator: ',' };
         this.csvParser.parse(stream, VehicleDTO, undefined, undefined, val).then((res) => {
            this.vehicleService.addVehicle(res.list);
        });
    }

    @OnQueueCompleted()
    onCompleted(job: Job, result: any) {
        this.gateway.notifyUserToTranformationCompleted(job.data.userSocketId);
    }
}