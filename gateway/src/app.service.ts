import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import fetch from 'cross-fetch';

@Injectable()
export class AppService {

  @Client({ transport: Transport.TCP, options: { port: 3001 } })
  private jobService: ClientProxy;

  getHello() {
    console.log('No rep')
    return this.jobService.send({ cmd: 'gogo' }, '');;
  }

  fetchDataFromGrapService(query) {
  //   const query = `
  //   query{
  //     allVehicles{
  //       nodes{
  //         firstName,
  //         lastName
  //       }
  //     }
  //   }
  // `

    return fetch('http://localhost:5000/graphql',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/graphql',
        },
        body: query
      }
    )
  }
}
