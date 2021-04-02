import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {

  @Client({transport: Transport.TCP, options: {port: 3001}})
  private jobService: ClientProxy;

  getHello() {
    return this.jobService.send({cmd: 'job'}, '');
  }
}
