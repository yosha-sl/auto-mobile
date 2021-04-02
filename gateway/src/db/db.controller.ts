import { Controller, Get } from "@nestjs/common";
import { DBService } from "./db.service";

@Controller('/api/db')
export class DBController{

    constructor(
        private readonly dbService:DBService
    ){}

    @Get()
    public com(){
        console.log('Hello This is testing for db service');
        return this.dbService.shakehand();
    }
}