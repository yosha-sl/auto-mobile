import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleViewComponent } from './vehicle/vehicle-view/vehicle-view.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'upload', component:UploadComponent},
  {path:'view', component:VehicleListComponent},
  {path:'view/:id', component:VehicleViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
