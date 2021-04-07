import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { VehicleResolver } from './vehicle/vehicle.resolver';
import { VehicleService } from './vehicle/vehicle.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    ) {}

  @Get()
  getHello() {
    this.appService.getHello([]);
    return "I am graph Services :)"
  }
}
