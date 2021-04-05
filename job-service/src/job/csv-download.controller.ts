import { Body, Controller, HttpService, Post, UploadedFile, UseInterceptors } from "@nestjs/common";

@Controller("files")
export class CSVDownloadController {

    constructor(private readonly httpService: HttpService,) { }

    @Post("gencsv")
    uploadSingle(@Body() body) {
        
    }
}