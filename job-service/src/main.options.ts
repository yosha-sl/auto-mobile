import { NestMicroserviceOptions } from "@nestjs/common/interfaces/microservices/nest-microservice-options.interface";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

export const OPTIONS: NestMicroserviceOptions & MicroserviceOptions = {
  transport: Transport.REDIS,
  options: {
    port: 3004,
    url: 'redis://localhost:6379',
  },
};