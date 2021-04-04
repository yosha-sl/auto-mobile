import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
  });
  await app.enableCors();
  await app.startAllMicroservicesAsync();
  await app.listen(3001);
 

  // const app = await NestFactory.createMicroservice(AppModule, OPTIONS);
  // app.listen(() => console.log('Job Microservice is listening'));
  //const vehicleDetailsMigrationProcessor = app.get(VehicleDetailsMigrationProcessor);
  //vehicleDetailsMigrationProcessor.startMigration();
}
bootstrap();
