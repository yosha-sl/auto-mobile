import { HttpModule, HttpService, Module } from "@nestjs/common";
import { from } from "rxjs";
import { CSVDownloadController } from "./csv-download.controller";
import { HelloService } from "./hello.service";

@Module({
    imports:[HttpModule],
    controllers: [CSVDownloadController],
    providers: [HelloService],
    exports: []
})
export class JobModule{}