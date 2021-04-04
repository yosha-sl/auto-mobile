import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { UploadService } from './upload.service';



@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class UploadModule { }
