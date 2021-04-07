import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {

  private client: ClientProxy;

  constructor(){
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      }
    });
  }

  getHello(val) {
    console.log('I am graph\'s app service');
    // this.jobService.send({cmd: 'gogo'}, '');
    return this.client.send<string, string>('jobGetHello', val).toPromise();
  }

}
