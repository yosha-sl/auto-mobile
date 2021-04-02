import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job, Queue } from "bull";
import { CsvParser, ParsedData } from "nest-csv-parser";
import * as fs from 'fs';
import { VehicleDTO } from "./vehicle.dto";
import { VehicleService } from "./vehicle.service";

@Processor('vehicle_details_migration')
export class VehicleDetailsMigrationProcessor{

    private readonly logger = new Logger(VehicleDetailsMigrationProcessor.name);

    constructor(
        @InjectQueue('vehicle_details_migration') private readonly audioQueue:Queue,
        private readonly csvParser: CsvParser,
        private readonly vehicleService:VehicleService
        ){}


    @Process('migrate')
    async migrateVehicleDetailsData(job: Job ){
        this.logger.log('Running');
        const location = 'D:/Development/Projects/auto-mobile/vehicle.csv';
        const stream = fs.createReadStream(location); 
        let val = { strict: true, separator: ',' };
        await this.csvParser.parse(stream, VehicleDTO,undefined, undefined,val).then( (res) => {
            this.vehicleService.addVehicle(res.list);
        });
    }

    async startMigration(){
        await this.audioQueue.add('migrate',undefined);
    }
}