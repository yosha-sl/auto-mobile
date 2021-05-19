import { HttpClientTestingModule } from "@angular/common/http/testing";
import { fakeAsync, TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { AppRoutingModule } from "src/app/app-routing.module";
import { VehicleService } from "../vehicle.service";
import { VehicleListComponent } from "./vehicle-list.component";


describe('Vehicle List Component', ()=>{
    beforeEach(async ()=>{
        await TestBed.configureTestingModule({
            declarations: [VehicleListComponent],
            imports: [AppRoutingModule, HttpClientTestingModule],
            providers:[VehicleService]
        });
    });
    describe(':', ()=> {
        
        function setup(){
            const fixture = TestBed.createComponent(VehicleListComponent);
            const app = fixture.debugElement.componentInstance;
            const vehicleService = fixture.debugElement.injector.get(VehicleService);
            return {fixture, app, vehicleService};
        }

        it('should be loaded', ()=>{
            const app = setup();
            expect(app).toBeTruthy();
        });

        it('should be resived 100 records only', fakeAsync( () => {
            const {fixture, app, vehicleService} = setup();
            spyOn(vehicleService, 'findAll').and.returnValues(
                // Observable.
            );
        }));
    });
});