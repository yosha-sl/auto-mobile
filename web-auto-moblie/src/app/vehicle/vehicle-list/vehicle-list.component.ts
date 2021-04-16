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




  hasNextPage = false;
  hasPreviousPage = false;
  endCursor = null;
  startCursor = null;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // this.apollo
    //   .query<any>({
    //     query: gql`
    //       {
    //         vehicles{
    //           id,
    //           firstName,
    //           lastName
    //         }
    //       }
    //     `
    //   })
    //   .subscribe(
    //     ({ data, loading }) => {
    //      this.vehiclesData = data.vehicles;
    //     }
    //   );
    this.fetchDataFromGateway(false, false);

  }

  fetchDataFromGateway(isNext: boolean, isPrevious: boolean) {
    let query = null;
    if (this.hasNextPage && isNext && this.endCursor) {
      query = `
        query{
          allVehicles(first:100, after:"${this.endCursor}",orderBy:MANUFACTURED_DATE_ASC){
            nodes{
              id,
              firstName,
              lastName,
              manufacturedDate
            },
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }
      `
    } else if (this.hasPreviousPage && isPrevious && this.startCursor) {
      query = `
        query{
          allVehicles(last:100,before:"${this.startCursor}",orderBy:MANUFACTURED_DATE_ASC){
            nodes{
              id,
              firstName,
              lastName,
              manufacturedDate
            },
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }
      `
    } else {
      query = `
        query{
          allVehicles(first:100,orderBy:MANUFACTURED_DATE_ASC){
            nodes{
              id,
              firstName,
              lastName,
              manufacturedDate
            },
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }
      `
    }
    // const headers = { 'Content-Type': 'application/graphql'};
    return this.http.post(`${environment.gatewayURL}/graph`, { query }).subscribe((res: any) => {
      console.log(res);
      this.vehiclesData = res.data.allVehicles.nodes;
      this.hasNextPage = res.data.allVehicles.pageInfo.hasNextPage;
      this.hasPreviousPage = res.data.allVehicles.pageInfo.hasPreviousPage;
      this.endCursor = res.data.allVehicles.pageInfo.endCursor;
      this.startCursor = res.data.allVehicles.pageInfo.startCursor;
    });
  }


  onView(id) {
    this.router.navigate(['/view', id]);
  }

  download() {
    return this.http.post(`${environment.baseURL}/files/download`,
      {
        vehicles: 'nodata',
        skid: sessionStorage.getItem('skid')
      }
    ).subscribe(res => {
      console.log(res);
    });
  }

  onDelete(id){
    let query = `
    mutation {
      deleteVehicleById(
        input: {id: ${id}}
        ) {
    query{
      allVehicles(first:100,orderBy:MANUFACTURED_DATE_ASC){
        nodes{
                id,
                firstName,
                lastName,
                manufacturedDate
              },
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
      }
    }
      }
    }
    `
    return this.http.post(`${environment.gatewayURL}/graph`, { query }).subscribe((res: any) => {
      console.log(res);
      this.vehiclesData = res.data.deleteVehicleById.query.allVehicles.nodes;
      this.hasNextPage = res.data.deleteVehicleById.query.allVehicles.pageInfo.hasNextPage;
      this.hasPreviousPage = res.data.deleteVehicleById.query.allVehicles.pageInfo.hasPreviousPage;
      this.endCursor = res.data.deleteVehicleById.query.allVehicles.pageInfo.endCursor;
      this.startCursor = res.data.deleteVehicleById.query.allVehicles.pageInfo.startCursor;
    });
  }



}
