import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';
import { environment } from "src/environments/environment";
import * as VehicleQuery from '../graphql/vehicle/query.gql';
import * as VehicleMutation from '../graphql/vehicle/mutation.gql';
import { Vehicle } from "./vehicle.model";
import { UpdateVehicleInput } from "../graphql/vehicle/update-vehicle-input.model";

export class VehicleFilter {
  public carMake: StringFilter
}

export class StringFilter {
  public includesInsensitive: string;
}

enum VehicleOrderBy {
  MANUFACTURED_DATE_ASC = "MANUFACTURED_DATE_ASC"
}


@Injectable()
export class VehicleService {

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

  create(createVehicleInput: Vehicle) {
    createVehicleInput.id = Number(createVehicleInput.id);
    return this.apollo.mutate({
      mutation: VehicleMutation.ADD,
      variables: {
        createVehicleInput: createVehicleInput
      },
    });
  }

  update(vehicle: Vehicle) {
    return this.apollo.mutate({
      mutation: VehicleMutation.UPDATE,
      variables: {
        updateVehicleInput: vehicle
      },
    });
  }

  findById(id: number) {
    let cid = Number(id);
    return this.apollo.query({
      query: VehicleQuery.GET_ONE,
      variables: {
        id: cid,
      },
    });
  }

  filter({ isNext, isPrevious, hasNextPage, hasPreviousPage, carMake, endCursor, startCursor }) {
    let stringFilter: StringFilter = new StringFilter();
    stringFilter.includesInsensitive = carMake;
    let filter: VehicleFilter = new VehicleFilter();
    filter.carMake = stringFilter;
    return this.apollo.query({
      query: VehicleQuery.FILTER,
      variables: {
        filter: filter,
        first: 100,
        after: (hasNextPage && isNext && endCursor)?endCursor:'',
        before: (hasPreviousPage && isPrevious && startCursor)?startCursor:'',
        orderBy: VehicleOrderBy.MANUFACTURED_DATE_ASC
      }
    });
  }

  findAll({ isNext, isPrevious, hasNextPage, endCursor, hasPreviousPage, startCursor }) {
    let query = null;
    if (hasNextPage && isNext && endCursor) {
      return this.apollo.watchQuery<any>({
        query: VehicleQuery.GET_AFTER,
        variables: {
          first: 100,
          after: endCursor,
          orderBy: VehicleOrderBy.MANUFACTURED_DATE_ASC
        }
      }).valueChanges;
    } else if (hasPreviousPage && isPrevious && startCursor) {
      return this.apollo.watchQuery<any>({
        query: VehicleQuery.GET_PREVIOUS,
        variables: {
          last: 100,
          beore: startCursor,
          orderBy: VehicleOrderBy.MANUFACTURED_DATE_ASC
        }
      }).valueChanges;

    } else {
      return this.apollo.watchQuery<any>({
        query: VehicleQuery.GET_LIMIT,
        variables: {
          first: 100,
          orderBy: VehicleOrderBy.MANUFACTURED_DATE_ASC
        }
      }).valueChanges;
    }
  }

  delete(id) {
    return this.apollo.mutate({
      mutation: VehicleMutation.DELETE,
      variables: {
        id: Number(id)
      },
    });
  }

  download(filterVal) {
    
    return this.http.post(`${environment.baseURL}/files/download`,
      {
        vehicles: 'nodata',
        skid: sessionStorage.getItem('skid'),
        filter: filterVal
      }
    ).subscribe(res => {
      console.log(res);
    });
  }
}