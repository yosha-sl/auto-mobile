import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UploadComponent } from "./upload.component";



describe('Upload Component', () => {
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadComponent],
            imports: [HttpClientTestingModule]
        });
    });

    describe(':', () => {
        function setup() {
            const fixture = TestBed.createComponent(UploadComponent);
            const app = fixture.debugElement.componentInstance;
            return { fixture, app };
        }

        it('should be loaded', () => {
            const {app} = setup();
            expect(app).toBeTruthy();
        })
    });
});