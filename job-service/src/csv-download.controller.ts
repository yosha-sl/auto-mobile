import { Body, Controller, HttpService, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MessagePattern, Payload, Transport } from "@nestjs/microservices";

@Controller()
export class CSVDownloadController {

    constructor() { }

    @MessagePattern({ cmd: 'job' })
    uploadSingle() {
        console.log('Got id');
    }

    @MessagePattern({ cmd: 'gogo' }, Transport.TCP)
    getTCPDate(@Payload() data: any) {
        console.log('Go go gooo');
        return "Hello Go Go";
    }

    @MessagePattern('jobGetHello')
    getHello(val): string {
        
        console.log('Got it From here');
        console.log(val);
        return "this.appService.getHello(name)";
    }
}