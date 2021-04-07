import { OnQueueCompleted, OnQueueProgress, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { SocketGateway } from "src/vehicle/socket.gateway";
const { Parser } = require('json2csv');

@Processor('vehicle_details_download')
export class VehicleDetailsDownloadProcessor {

    private readonly logger = new Logger(VehicleDetailsDownloadProcessor.name);

    constructor(
        private readonly gateway: SocketGateway
    ) { }


    @Process('csv_download')
    async migrateVehicleDetailsData(job: Job) {
        console.log('start to roll out requesrt')
        const json2csvParser = new Parser({ delimiter: ',' });
        const tsv = json2csvParser.parse(job.data.file.path);
        job.data.result = tsv;
    }

    @OnQueueCompleted()
    onCompleted(job: Job, result: any) {
        console.log(job);
        console.log('***********************************************')
        this.gateway.sendUserToCSV(job.data.userSocketId);
    }
}