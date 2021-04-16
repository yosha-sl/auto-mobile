import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    console.log('3005')
    return this.appService.getHello();
  }

  @Post("graph")
  async fetchData(@Body() fetchData: any) {
    console.log('Fetching graph');
    console.log(fetchData.query);
    return await this.appService.fetchDataFromGrapService(fetchData.query)
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => {
      console.error(err);
    });;
  }
}
