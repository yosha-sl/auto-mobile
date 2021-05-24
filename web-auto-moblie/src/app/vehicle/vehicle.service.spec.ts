import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { VehicleService } from "./vehicle.service";
import * as VehicleQuery from '../graphql/vehicle/query.gql';
import {
    ApolloTestingModule,
    ApolloTestingController,
} from 'apollo-angular/testing';

describe('Vehicle Service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VehicleService],
            imports: [HttpClientTestingModule, ApolloTestingModule]
        });
    });

    describe(':', () => {

        function setup() {
            const testingController = TestBed.inject(HttpTestingController);
            const apolloController = TestBed.inject(ApolloTestingController);
            const vehicleService = TestBed.inject(VehicleService);
            return { vehicleService, testingController, apolloController };
        }

        it('should be loaded', () => {
            const { vehicleService, testingController } = setup();
            expect(vehicleService).toBeTruthy();
        });

        it('should be retrived data by given id', () => {

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
            };

            const { apolloController, vehicleService } = setup(); 
            
            vehicleService.findById(7279).subscribe((vehicle:any) => {
                expect(vehicle.data).toEqual(mockData);
            });
            const op = apolloController.expectOne(VehicleQuery.GET_ONE);    
            expect(op.operation.variables.id).toEqual(7279);
            //expect(op.operation.variables.firstName).toEqual("Helyn");
            op.flush({
                data: mockData
            });
            // expect(mockData).toBeDefined();
        });


        // it('should return expected vehicle', () => {
        //     const { vehicleService, testingController } = setup();
        //     const mockData = {

        //         "vehicleById": {
        //             "id": 7279,
        //             "firstName": "Helyn",
        //             "lastName": "Beardsley",
        //             "email": "Palaihari",
        //             "carMake": "BMW",
        //             "carModel": "8 Series",
        //             "vinNumber": "WAUAH74F36N884562",
        //             "manufacturedDate": "1981-08-14"
        //         }

        //     }
        //     vehicleService.findById(7279).subscribe( (vehicle:any) => {
        //         expect(vehicle.data).toEqual(mockData);
        //     });

        //     const req = testingController.expectOne('http://127.0.0.1:3000/graphql');

        //     expect(req.request.method).toBe('POST');

        //     req.flush({
        //         data: mockData
        //     });

        // });

        afterEach(() => {
            const { testingController, apolloController } = setup();
            testingController.verify();
            apolloController.verify();
        });
    });

});