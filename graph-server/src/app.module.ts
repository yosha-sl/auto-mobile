import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./src/**/*.graphql'],
    })
  ],
  controllers: [  ],
  providers: [VehicleService, VehicleResolver],
})
export class AppModule {}
