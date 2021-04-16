import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle.component';
import {VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleViewComponent } from './vehicle-view/vehicle-view.component';
import { FormsModule } from '@angular/forms';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';



@NgModule({
  declarations: [
    VehicleComponent,
    VehicleListComponent,
    VehicleViewComponent,
    VehicleSearchComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: []
})
export class VehicleModule { }
