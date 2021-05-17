import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleViewComponent } from './vehicle-view/vehicle-view.component';
import { FormsModule } from '@angular/forms';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import { VehicleService } from './vehicle.service';



@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleViewComponent,
    VehicleSearchComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers:[VehicleService],
  exports: []
})
export class VehicleModule { }
