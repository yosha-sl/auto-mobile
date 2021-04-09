import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("files")
export class CSVUploadController {

    @Post("csv")
    @UseInterceptors(FileInterceptor("csv", { dest: "./uploads" }))
    uploadSingle(@UploadedFile() file) {
        console.log(file.filename); 
    }
}