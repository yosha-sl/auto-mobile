import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { VehicleService } from '../vehicle.service';

export class Vehicle {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public carMake: string;
  public carModel: string;
  public vinNumber: string;
  public manufacturedDate: string;
}

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {

  public vehicle: Vehicle;
  public id = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : '';
    console.log(this.route.snapshot.paramMap.get('id'));
    if (this.id != '') { this.findVehicleById(this.id) } else { this.vehicle = new Vehicle };
    // this.apollo
    //   .query<any>({
    //     query: gql`
    //       {
    //         vehicleById(id: ${id}){
    //           id,
    //           firstName,
    //           lastName,
    //           email,
    //           carMake,
    //           carModel,
    //           vinNumber,
    //           manufactured_date,
    //         }
    //       }
    //     `
    //   })
    //   .subscribe(
    //     ({ data, loading }) => {
    //       this.vehicle = data.vehicle;
    //     }
    //   );
  }

  onSubmit() {
    this.updateVehicleById();
  }

  findVehicleById(id) {
    this.vehicleService.findById(id).subscribe((res: any) => {
      this.vehicle = res.data.vehicleById;
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
