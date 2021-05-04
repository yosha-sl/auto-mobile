import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from 'src/environments/environment';

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
    private apollo: Apollo,
    private http: HttpClient
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
    let query = `
    query{
      vehicleById(id: ${id}){
        id,
        firstName,
        lastName,
        email,
        carMake,
        carModel,
        vinNumber,
        manufacturedDate
      }
    }
    `
    return this.http.post(`${environment.gatewayURL}/graphql`, { query }).subscribe((res: any) => {
      this.vehicle = res.data.vehicleById;
    });
  }

  updateVehicleById() {
    let query;
    if (this.id != '') {
      query = `
    mutation {
      updateVehicleById(
        updateVehicleInput: {
            id: ${this.vehicle.id}
            firstName: "${this.vehicle.firstName}",
            lastName : "${this.vehicle.lastName}",
            email : "${this.vehicle.email}",
            carMake : "${this.vehicle.carMake}",
            carModel : "${this.vehicle.carModel}",
            vinNumber : "${this.vehicle.vinNumber}",
            manufacturedDate : "${this.vehicle.manufacturedDate}"
      }) {
          id,
          firstName,
          lastName,
          email,
          carMake,
          carModel,
          vinNumber,
          manufacturedDate
      }
    }
    `
    } else {
      console.log(this.vehicle);
      query = `
    mutation {
      createVehicle(
        createVehicleInput: {
          id: ${this.vehicle.id},
          firstName: "${this.vehicle.firstName}",
          lastName : "${this.vehicle.lastName}",
          email : "${this.vehicle.email}",
          carMake : "${this.vehicle.carMake}",
          carModel : "${this.vehicle.carModel}",
          vinNumber : "${this.vehicle.vinNumber}",
          manufacturedDate : "${this.vehicle.manufacturedDate}"
      }) {
       
          id,
          firstName,
          lastName,
          email,
          carMake,
          carModel,
          vinNumber,
          manufacturedDate
        
      }
    }
    `
    }
    console.log(this.vehicle);
    return this.http.post(`${environment.gatewayURL}/graphql`, { query }).subscribe((res: any) => {
      // this.vehicle = res.data.updateVehicleById.vehicle;
      this.router.navigate(['/view']);
    });
  }

}
