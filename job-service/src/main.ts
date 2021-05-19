import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      port: 3002,
      url: 'redis://localhost:6379',
    },
  });
  await app.enableCors();
  await app.startAllMicroservicesAsync();
  await app.listen(3001, () => console.log('Job Service Microservice is listening'));

  // const app = await NestFactory.createMicroservice(AppModule, OPTIONS);
  // app.listen(() => console.log('Job Microservice is listening'));
  //const vehicleDetailsMigrationProcessor = app.get(VehicleDetailsMigrationProcessor);
  //vehicleDetailsMigrationProcessor.startMigration();
}
bootstrap();
