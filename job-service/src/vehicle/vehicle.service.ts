import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Queue } from "bull";
import { from } from "rxjs";
import { Repository } from "typeorm";
import { VehicleDTO } from "./vehicle.dto";
import { Vehicle } from "./vehicle.entity";
import fetch from 'cross-fetch';

@Injectable()
export class VehicleService {

    private readonly logger = new Logger(VehicleService.name);

    // @Client({transport: Transport.TCP, options:{port: 3002}})
    // private dbService: ClientProxy;
    constructor(
        @InjectQueue('vehicle_details_migration') private readonly migrationQueue: Queue,
        @InjectQueue('vehicle_details_download') private readonly genarateQueue: Queue,
        @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>
    ) { }


    async addVehicle(data: VehicleDTO[]) {
        let newList = data.map(vehicleDTO => new Vehicle(vehicleDTO));
        newList.forEach((v: Vehicle, index) => {
            //this.logger.log(`${index} First Name : ${v.firstName} | Last Name : ${v.lastName}`);
        });
        this.vehicleRepository.save(newList);
    }

    createVehicleCSVMigrationJob(file, skid) {
        this.migrationQueue.add('migrate', { file: file, userSocketId: skid });
    }

    downloadVehicleDetailsCSVJob(filter, skid) {
        this.genarateQueue.add('csv_download', { filter: filter, userSocketId: skid });
    }

    callToServer(q/* chage */, skid) {
        const query = `
        {
            vehicles{
                firstName
                ,lastName
            }
        }
      `

        fetch('http://localhost:3000/graphql',
        {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({query})
          }
        )
            .then(res => {
                if (res.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return res.json();
            })
            .then(user => {
                this.downloadVehicleDetailsCSVJob(user, skid);
                // console.log(user);
            })
            .catch(err => {
                console.error(err);
            });
    }

}