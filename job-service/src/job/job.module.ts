import { Module } from "@nestjs/common";
import { from } from "rxjs";
import { CSVUploadController } from "./csv-upload.controller";

@Module({
    imports:[],
    controllers: [CSVUploadController],
    providers: []
})
export class JobModule{}