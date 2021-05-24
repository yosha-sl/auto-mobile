import { Injectable, NotFoundException } from '@nestjs/common';
import fetch from 'cross-fetch';


const URL = 'http://localhost:5000/graphql';

@Injectable()
export class VehicleService {

  async findAll(filter: any, first, last, after, before, orderBy) {
    if (filter == null) {
      throw new NotFoundException('filter found.');
    }
    const query = `
        {query{
            allVehicles(
              filter:{ carMake: { includesInsensitive: "${filter.carMake.includesInsensitive}" } },
              ${first ? ('first:' + first + ',') : ''}
              ${last ? ('last:' + last + ',') : ''}
              ${after ? ('after:"' + after + '",') : ''}
              ${before ? ('before:"' + before + '",') : ''}
              orderBy:${orderBy}
              ){
                nodes{
                  id
                  firstName
                  lastName
                  email
                  carMake
                  carModel
                  vinNumber
                  manufacturedDate
              },
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
              }
          }}
        `;

    let result = await this.fetchData(query);
    return result.data.query.allVehicles;
  }

  async findAllByLimitAndOrder(first, last, after, before, orderBy) {
    const query = `
        {query{
            allVehicles(
              ${first ? ('first:' + first + ',') : ''}
              ${last ? ('last:' + last + ',') : ''}
              ${after ? ('after:"' + after + '",') : ''}
              ${before ? ('before:"' + before + '",') : ''}
              orderBy:${orderBy}
              ){
                nodes{
                    id
                    firstName
                    lastName
                    email
                    carMake
                    carModel
                    vinNumber
                    manufacturedDate
                },
                pageInfo {
                  startCursor
                  endCursor
                  hasNextPage
                  hasPreviousPage
                }
              }
          }}
        `;
    let result = await this.fetchData(query);
    return result.data.query.allVehicles;
  }

  async findOne(id) {
    const query = `
        {query{
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
          }}
        `;
    let result = await this.fetchData(query);
    return result.data.query.vehicleById;
  }

  async create(vehicle) {


    const query = `
    mutation {
      createVehicle(
        input: {
          vehicle: 
          { id: ${vehicle.id},
            firstName: "${vehicle.firstName}",
            lastName: "${vehicle.lastName}",
            carModel: "${vehicle.carModel}",
            vinNumber: "${vehicle.vinNumber}",
            manufacturedDate: "${vehicle.manufacturedDate}",
            email: "${vehicle.email}",
            carMake: "${vehicle.carMake}",
            } 
          }
      ) {
        vehicle {
          id
          firstName
          lastName
          email
          carMake
          carModel
          vinNumber
          manufacturedDate
        }
      }
    }
        `;
    let result = await this.fetchData(query);
    return result.data.createVehicle.vehicle;

  }

  async update(id, vehicle) {

    const query = `
    mutation {
      updateVehicleById(
        input: {id: ${id}, 
          vehiclePatch: {
            firstName: "${vehicle.firstName}",
            lastName : "${vehicle.lastName}",
            email : "${vehicle.email}",
            carMake : "${vehicle.carMake}",
            carModel : "${vehicle.carModel}",
            vinNumber : "${vehicle.vinNumber}",
            manufacturedDate : "${vehicle.manufacturedDate}"
      }}) {
        vehicle {
          id
          firstName
          lastName
          email
          carMake
          carModel
          vinNumber
          manufacturedDate
        }
      }
    }
    `;
    let result = await this.fetchData(query);
    return result.data.updateVehicleById.vehicle;
  }

  async removeById(id) {

    const query = `
    mutation {
      deleteVehicleById(input: {id: ${id}}) {
        vehicle{
          id
          firstName
          lastName
          email
          carMake
          carModel
          vinNumber
          manufacturedDate
        }
       }
      }
        `;
    let result = await this.fetchData(query);
    return result.data.deleteVehicleById.vehicle;
  }


  private async fetchData(query) {
    try {
      const res = await fetch(URL, {
        method: 'post',
        headers: {
          'Content-Type': 'application/graphql',
        },
        body: query
      });

      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }

      const result = await res.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  }
}
