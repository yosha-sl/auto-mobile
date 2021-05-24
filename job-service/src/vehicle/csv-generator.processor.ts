import { OnQueueCompleted, OnQueueProgress, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { SocketGateway } from "src/vehicle/socket.gateway";
import { VehicleGraphService } from "./vehicle-graph.service";
const { Parser } = require('json2csv');

@Processor('vehicle_details_download')
export class VehicleDetailsDownloadProcessor {

    private readonly logger = new Logger(VehicleDetailsDownloadProcessor.name);

    constructor(
        private readonly gateway: SocketGateway,
        private vehicleGraphService: VehicleGraphService
    ) { }


    @Process('csv_download')
    async migrateVehicleDetailsData(job: Job) {
        console.log('start to roll out requesrt');
        //retrive data from graph service
        let resut = await this.vehicleGraphService.callToServer(job.data.filter);
        
        //generate filter
        const json2csvParser = new Parser({ delimiter: ',' });
        const tcsv = json2csvParser.parse(resut);
        // console.log(tcsv);
        // job.data.result = tsv;
    }

    @OnQueueCompleted()
    onCompleted(job: Job, result: any) {
        this.gateway.notifyUserToTranformationCompleted(job.data.userSocketId, 'Ready to dowload requested file');
    }
}