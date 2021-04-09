import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";

@Injectable()
export class jobService {

    @Client({ transport: Transport.TCP, options: { port: 3001 } })
    private jobService: ClientProxy;

    createJob(file:File) {
        return this.jobService.send({ cmd: 'csv-transoform' }, file);
    }
}