import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehicleSearchComponent } from "./vehicle-search.component";
import { VehicleService } from "../vehicle.service";


describe('Vehicle Search Component', () => {
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleSearchComponent],
            imports: [HttpClientTestingModule],
            providers: [VehicleService]
        });
    });

    describe(':', () => {
        function setup() {
            const fixture = TestBed.createComponent(VehicleSearchComponent);
            const app = fixture.debugElement.componentInstance;
            return { fixture, app };
        }

        it('should be loaded', () => {
            const {app} = setup();
            expect(app).toBeTruthy();
        })
    });
});