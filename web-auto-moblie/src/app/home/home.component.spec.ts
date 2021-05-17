import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeComponent } from "./home.component";


describe('Home Component', () => {
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [HttpClientTestingModule]
        });
    });

    describe(':', () => {
        function setup() {
            const fixture = TestBed.createComponent(HomeComponent);
            const app = fixture.debugElement.componentInstance;
            return { fixture, app };
        }

        it('should be loaded', () => {
            const {app} = setup();
            expect(app).toBeTruthy();
        })
    });
});