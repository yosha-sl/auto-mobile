import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";
import { VehicleService } from "./vehicle.service";
import { Queue } from "bull";
import { BullModule } from "@nestjs/bull";
import { TypeOrmModule } from "@nestjs/typeorm";

describe('Vehicle Service', () => {

    let vehicleService: VehicleService;

    beforeEach(async () => {
        const modelRef = await Test.createTestingModule({
            imports: [BullModule.forRoot({}),TypeOrmModule.forRoot()],
            providers: [VehicleService,Repository]
        }).compile();
        vehicleService = modelRef.get<VehicleService>(VehicleService);
    });


    describe('addVehicle', () => {
        it('should be added vehicles', async () => {
            const newVehicles:any = [
                {
                    id: 1001,
                    first_name: "First",
                    last_name: "Last",
                    email: "email",
                    car_make: "car make",
                    car_model: "car model",
                    vin_number: "vin number",
                    manufactured_date: "mn dates"
                }
            ];
            const vehicleList = [];
            jest.spyOn(vehicleService, 'addVehicle').mockImplementation();
            await vehicleService.addVehicle(newVehicles);
            expect(vehicleList.length).toEqual(1);
        });
    });

});