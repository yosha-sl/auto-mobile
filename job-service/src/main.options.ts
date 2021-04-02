import { NestMicroserviceOptions } from "@nestjs/common/interfaces/microservices/nest-microservice-options.interface";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

export const OPTIONS: NestMicroserviceOptions & MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  };