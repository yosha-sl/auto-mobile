import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class DBService{

    @Client({transport:Transport.TCP, options: {port: 3002}})
    private dbMsService: ClientProxy;

    public shakehand(){
        console.log('This is gateway ')
        return this.dbMsService.send({cmd: 'shakehand'},'');
    }
}