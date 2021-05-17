import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class VehicleService {

    constructor(private http: HttpClient) { }

    create(vehicle) {
        let query = `
        mutation {
          createVehicle(
            createVehicleInput: {
              id: ${vehicle.id},
              firstName: "${vehicle.firstName}",
              lastName : "${vehicle.lastName}",
              email : "${vehicle.email}",
              carMake : "${vehicle.carMake}",
              carModel : "${vehicle.carModel}",
              vinNumber : "${vehicle.vinNumber}",
              manufacturedDate : "${vehicle.manufacturedDate}"
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
        return this.http.post(`${environment.gatewayURL}/graphql`, { query });
    }

    update(vehicle) {
        let query = `
        mutation {
          updateVehicleById(
            updateVehicleInput: {
                id: ${vehicle.id}
                firstName: "${vehicle.firstName}",
                lastName : "${vehicle.lastName}",
                email : "${vehicle.email}",
                carMake : "${vehicle.carMake}",
                carModel : "${vehicle.carModel}",
                vinNumber : "${vehicle.vinNumber}",
                manufacturedDate : "${vehicle.manufacturedDate}"
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
        return this.http.post(`${environment.gatewayURL}/graphql`, { query });
    }

    findById(id) {
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
        return this.http.post(`${environment.gatewayURL}/graphql`, { query });
    }

    filter({ carMake }) {
        let query = `
    query{
      allVehicles(filter: {
        carMake: {
          includesInsensitive: "${carMake}"
        }
      }){
        
          carModel
          carMake
          vinNumber
        
      }
    }
      `
        return this.http.post(`${environment.gatewayURL}/graphql`, { query });
    }

    findAll({ isNext, isPrevious, hasNextPage, endCursor, hasPreviousPage, startCursor }) {
        let query = null;
        if (hasNextPage && isNext && endCursor) {
            query = `
        query{
          allVehiclesByLimitAndOrder(first:100, after:"${endCursor}",orderBy:MANUFACTURED_DATE_ASC){
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
        } else if (hasPreviousPage && isPrevious && startCursor) {
            query = `
        query{
          allVehiclesByLimitAndOrder(last:100,before:"${startCursor}",orderBy:MANUFACTURED_DATE_ASC){
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
          allVehiclesByLimitAndOrder(first:100,orderBy:MANUFACTURED_DATE_ASC){
            nodes{
              id,
              firstName,
              lastName,
              manufacturedDate
            }
            pageInfo{
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }
      `
        }
        return this.http.post(`${environment.gatewayURL}/graphql`, { query });
    }

    delete(id) {
        let query = `
        mutation{
            deleteVehicleById(id:${id}){
                firstName 
            }
        }
        `
        return this.http.post(`${environment.gatewayURL}/graphql`, { query });
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
}