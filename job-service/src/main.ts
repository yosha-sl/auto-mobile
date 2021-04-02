import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OPTIONS } from './main.options';
import { VehicleDetailsMigrationProcessor } from './vehicle/vehicle-details-migration.processor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, OPTIONS);
  app.listen(() => console.log('Job Microservice is listening'));
  const vehicleDetailsMigrationProcessor = app.get(VehicleDetailsMigrationProcessor);
  vehicleDetailsMigrationProcessor.startMigration();
}
bootstrap();
