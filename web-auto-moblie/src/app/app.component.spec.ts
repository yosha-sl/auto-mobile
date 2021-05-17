import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from "./app.component";



describe('App Component', () => {
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [HttpClientTestingModule]
        });
    });

    describe(':', () => {
        function setup() {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;
            return { fixture, app };
        }

        it('should be loaded', () => {
            const {app} = setup();
            expect(app).toBeTruthy();
        })
    });
});