import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export class Vehicle {

  id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public carMake: string;
  public carModel: string;
  public vinNumber: string;
  public manufactured_date: string;
}

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {

  vehicle: Vehicle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    this.apollo
      .query<any>({
        query: gql`
          {
            vehicle(id: ${id}){
              id,
              firstName,
              lastName,
              email,
              carMake,
              carModel,
              vinNumber,
              manufactured_date,
            }
          }
        `
      })
      .subscribe(
        ({ data, loading }) => {
          this.vehicle = data.vehicle;
        }
      );
  }

  onSubmit() {

    const CREATE_LINK_MUTATION = gql`
    
      mutation{
        updateVehicle(updateVehicleInput:{
          id: ${this.vehicle.id},
          firstName: ${this.vehicle.firstName},
          lastName: ${this.vehicle.lastName},
          email: ${this.vehicle.email},
          carMake: ${this.vehicle.carMake},
          carModel: ${this.vehicle.carModel},
          vinNumber: ${this.vehicle.vinNumber},
          manufactured_date: ${this.vehicle.manufactured_date},
        }){id}
      }
    `;

    this.apollo.mutate({
      mutation: CREATE_LINK_MUTATION,
      
    }).subscribe((response) => {
        console.log(response);
    });


  }

}
