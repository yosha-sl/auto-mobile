import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Queue } from "bull";
import { from } from "rxjs";
import { Repository } from "typeorm";
import { VehicleDTO } from "./vehicle.dto";
import { Vehicle } from "./vehicle.entity";
import fetch from 'cross-fetch';

const URL = 'http://localhost:3000/graphql';

export class VehicleFilter {
    public carMake: StringFilter
}

export class StringFilter {
    public includesInsensitive: string;
}

@Injectable()
export class VehicleGraphService {

    private readonly logger = new Logger(VehicleGraphService.name);

    async callToServer(carMake) {

        let stringFilter: StringFilter = new StringFilter();
        stringFilter.includesInsensitive = carMake;
        let filter: VehicleFilter = new VehicleFilter();
        filter.carMake = stringFilter;

        const query = `
        query{
            allVehicles(
              filter:{ carMake: { includesInsensitive: "Jeep" } },
              orderBy: MANUFACTURED_DATE_ASC
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
          }
        `;

        let result = await this.fetchData(query);
        return result.data.allVehicles.nodes;
    }


    private async fetchData(query) {
        try {
            const res = await fetch(URL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query })
            });

            if (res.status >= 400) {
                console.log(res);
                throw new Error("Bad response from server");
            }

            const result = await res.json();
            return result;
        } catch (err) {
            console.error(err);
        }
    }

}