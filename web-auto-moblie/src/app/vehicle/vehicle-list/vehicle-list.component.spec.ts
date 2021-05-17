import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
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
            return {fixture, app};
        }

        it('should be loaded', ()=>{
            const app = setup();
            expect(app).toBeTruthy();
        });
    });
});