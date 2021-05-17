import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { VehicleService } from "./vehicle.service";

describe('Vehicle Service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VehicleService],
            imports: [HttpClientTestingModule]
        });
    });

    describe(':', () => {

        function setup() {
            const vehicleService = TestBed.inject(VehicleService);
            const testingController = TestBed.inject(HttpTestingController);
            return { vehicleService, testingController };
        }

        it('should be loaded', () => {
            const { vehicleService, testingController } = setup();
            expect(vehicleService).toBeTruthy();
        });

        it('should return expected vehicle', () => {
            const { vehicleService, testingController } = setup();
            const mockData = {

                "vehicleById": {
                    "id": 7279,
                    "firstName": "Helyn",
                    "lastName": "Beardsley",
                    "email": "Palaihari",
                    "carMake": "BMW",
                    "carModel": "8 Series",
                    "vinNumber": "WAUAH74F36N884562",
                    "manufacturedDate": "1981-08-14"
                }

            }
            vehicleService.findById(7279).subscribe( (vehicle:any) => {
                expect(vehicle.data).toEqual(mockData);
            });

            const req = testingController.expectOne('http://127.0.0.1:3000/graphql');

            expect(req.request.method).toBe('POST');

            req.flush({
                data: mockData
            });

        });

        afterEach(() => {
            const { testingController } = setup();
            testingController.verify();
        });
    });
    
});