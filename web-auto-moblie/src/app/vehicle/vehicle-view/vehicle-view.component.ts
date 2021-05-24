import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateVehicleInput } from 'src/app/graphql/vehicle/update-vehicle-input.model';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../vehicle.service';


@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {

  public vehicle: any;
  public id = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : '';
    if (this.id != '') { 
      this.vehicle = new UpdateVehicleInput();
      this.findVehicleById(this.id) ;
    } else { this.vehicle = new Vehicle };
  }

  onSubmit() {
    this.updateVehicleById();
  }

  findVehicleById(id) {
    this.vehicleService.findById(id).subscribe((res: any) => {
      let tempVehicle = res.data.vehicleById;
      this.vehicle.id = tempVehicle.id;
      this.vehicle.firstName = tempVehicle.firstName;
      this.vehicle.lastName = tempVehicle.lastName;
      this.vehicle.carMake = tempVehicle.carMake;
      this.vehicle.carModel = tempVehicle.carModel;
      this.vehicle.manufacturedDate = tempVehicle.manufacturedDate;
      this.vehicle.email = tempVehicle.email;
      this.vehicle.vinNumber = tempVehicle.vinNumber;
    });
  }

  updateVehicleById() {
    if (this.id != '') {
      this.vehicleService.update(this.vehicle).subscribe((res: any) => {
        this.router.navigate(['/view']);
      });
    } else {
      console.log(this.vehicle);
      this.vehicleService.create(this.vehicle).subscribe((res: any) => {
        this.router.navigate(['/view']);
      });
    }
  }

}
