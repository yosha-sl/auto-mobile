import { BullModule } from "@nestjs/bull";
import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CsvModule } from "nest-csv-parser";
import { SocketGateway } from "./socket.gateway";
import { VehicleDetailsMigrationProcessor } from "./vehicle-details-migration.processor";
import { VehicleDetailsDownloadProcessor } from "./csv-generator.processor";
import { VehicleController } from "./vehicle.controller";
import { Vehicle } from "./vehicle.entity";
import { VehicleService } from "./vehicle.service";
import { VehicleGraphService } from "./vehicle-graph.service";


@Module({
    imports: [
        BullModule.registerQueue({
            name: 'vehicle_details_migration'
        },
        {
            name: 'vehicle_details_download'
        }),
        CsvModule,
        TypeOrmModule.forFeature([Vehicle])
    ],
    controllers : [VehicleController],
    providers :[VehicleDetailsMigrationProcessor,
        VehicleDetailsDownloadProcessor ,
        VehicleService, SocketGateway, VehicleGraphService]
})
export class VehicleModule{

}