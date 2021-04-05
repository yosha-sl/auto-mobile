import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './orm.config';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql')
  }), 
  TypeOrmModule.forRoot(ormConfig), VehicleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
