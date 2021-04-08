import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehiclesData: any[];
  constructor(
    private apollo: Apollo,
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.apollo
      .query<any>({
        query: gql`
          {
            vehicles{
              id,
              firstName,
              lastName
            }
          }
        `
      })
      .subscribe(
        ({ data, loading }) => {
         this.vehiclesData = data.vehicles;
        }
      );
  }


  onView(id){
    this.router.navigate(['/view', id]);
  }

  download(){
    return this.http.post(`${environment.baseURL}/files/download`, 
      {
        vehicles: 'nodata',
        skid: sessionStorage.getItem('skid')
      }
    ).subscribe(res => {
      console.log(res);
    });
  }

  

}
