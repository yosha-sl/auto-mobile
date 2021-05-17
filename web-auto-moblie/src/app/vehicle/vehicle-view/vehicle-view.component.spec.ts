import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehicleViewComponent } from "./vehicle-view.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { VehicleService } from "../vehicle.service";

describe('Vehicle View Component', () => {
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleViewComponent],
            imports: [HttpClientTestingModule,RouterModule.forRoot([])],
            providers: [VehicleService]
        });
    });

    describe(':', () => {
        function setup() {
            const fixture = TestBed.createComponent(VehicleViewComponent);
            const app = fixture.debugElement.componentInstance;
            return { fixture, app };
        }

        it('should be loaded', () => {
            const {app} = setup();
            expect(app).toBeTruthy();
        })
    });
});