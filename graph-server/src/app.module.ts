import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./src/**/*.graphql'],
    })
  ],
  controllers: [AppController],
  providers: [AppService, VehicleService, VehicleResolver],
})
export class AppModule {}
