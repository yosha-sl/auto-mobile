import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CsvModule } from "nest-csv-parser";
import { from } from "rxjs";
import { VehicleDetailsMigrationProcessor } from "./vehicle-details-migration.processor";
import { VehicleController } from "./vehicle.controller";
import { Vehicle } from "./vehicle.entity";
import { VehicleService } from "./vehicle.service";


@Module({
    imports: [
        BullModule.registerQueue({
            name: 'vehicle_details_migration'
        }),
        CsvModule,
        TypeOrmModule.forFeature([Vehicle])
    ],
    controllers : [VehicleController],
    providers :[VehicleDetailsMigrationProcessor, VehicleService]
})
export class VehicleModule{

}