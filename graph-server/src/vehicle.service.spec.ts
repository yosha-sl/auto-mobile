import { Test } from "@nestjs/testing";
import { VehicleService } from "./vehicle.service";

describe('Vehicle Service', () => {

    let vehicleService: VehicleService;

    beforeEach(async () => {
        const modelRef = await Test.createTestingModule({
            imports: [],
            providers: [VehicleService]
        }).compile();
        vehicleService = modelRef.get<VehicleService>(VehicleService);
    });


    describe(':', () => {

        it('should be initialize', async () => {

            expect(vehicleService).toBeTruthy();
        });

        it('should be added vehicles', async () => {
            const newVehicles: any = {
                id: 1001,
                first_name: "First",
                last_name: "Last",
                email: "email",
                car_make: "car make",
                car_model: "car model",
                vin_number: "vin number",
                manufactured_date: "mn dates"
            }

            const vehicleList: any = [];
            jest.spyOn(vehicleService, 'create').mockImplementation((vehicle) => vehicleList.push(vehicle));
            await vehicleService.create(newVehicles);
            expect(vehicleList.length).toBe(1);
        });

        test('should be find error', async () => {
            const vehicddleList: any = [
                {
                    id: 1001,
                    first_name: "First",
                    last_name: "Last",
                    email: "email",
                    car_make: "car make",
                    car_model: "car model",
                    vin_number: "vin number",
                    manufactured_date: "mn dates"
                },
                {
                    id: 1002,
                    first_name: "First2",
                    last_name: "Last2",
                    email: "email2",
                    car_make: "car make2",
                    car_model: "car model2",
                    vin_number: "vin number2",
                    manufactured_date: "mn dates2"
                }
            ];
            jest.spyOn(vehicleService, 'create').mockImplementation(vehicddleList);
            try{
                expect(await vehicleService.findAll(null, null, null, null, null, null));
            }catch(e){
                expect(e.message).toBe('filter found.');
            }
            
        
        });
    });

});