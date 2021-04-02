import { type } from "node:os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { VehicleDTO } from "./vehicle.dto";

@Entity('vehicle')
export class Vehicle {

    @PrimaryGeneratedColumn()
    id

    @Column({ nullable: true})
    public firstName: string;

    @Column({ nullable: true})
    public lastName: string;

    @Column({ nullable: true})
    public email: string;

    @Column({ nullable: true})
    public carMake: string;

    @Column({ nullable: true})
    public carModel: string;

    @Column({ nullable: true})
    public vinNumber: string;

    @Column({ type: "date", nullable: true})
    public manufactured_date: string;

    constructor( vehicleDTO: VehicleDTO ){ 
        this.firstName = vehicleDTO?.first_name;
        this.lastName = vehicleDTO?.last_name;
        this.email = vehicleDTO?.email;
        this.carMake = vehicleDTO?.car_make;
        this.carModel = vehicleDTO?.car_model;
        this.vinNumber = vehicleDTO?.vin_number;
        this.manufactured_date = vehicleDTO?.manufactured_date;
    }
}