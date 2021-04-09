import { Module } from "@nestjs/common";
import { CSVUploadController } from "./csv-upload.controller";

@Module({
    imports:[],
    controllers: [CSVUploadController],
    providers: []
})
export class JobModule{

}