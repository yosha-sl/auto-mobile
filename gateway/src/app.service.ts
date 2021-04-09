import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {

  @Client({transport: Transport.TCP, options: {port: 3001}})
  private jobService: ClientProxy;
 
  getHello() {
    console.log('No rep')
    return this.jobService.send({cmd: 'gogo'}, ''); ;
  }
}
