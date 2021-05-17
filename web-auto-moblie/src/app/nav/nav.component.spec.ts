import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavComponent } from "./nav.component";



describe('Nav Component', () => {
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavComponent],
            imports: [HttpClientTestingModule]
        });
    });

    describe(':', () => {
        function setup() {
            const fixture = TestBed.createComponent(NavComponent);
            const app = fixture.debugElement.componentInstance;
            return { fixture, app };
        }

        it('should be loaded', () => {
            const {app} = setup();
            expect(app).toBeTruthy();
        })
    });
});