import { Vehicle } from "./vehicle.entity";

export class VehicleDTO{
    constructor(
        public id:string,
        public first_name:string,
        public last_name:string,
        public email: string,
        public car_make: string,
        public car_model: string,
        public vin_number:string,
        public manufactured_date:string
    ){}

    // toVehicle(): Vehicle{
    //     let vehicle = new Vehicle();
    //     vehicle.id =  this.id;
    //     vehicle.firstName = this.first_name;
    //     vehicle.lastName = this.last_name;
    //     vehicle.email = this.email;
    //     vehicle.carMake = this.car_make;
    //     vehicle.carModel = this.car_model;
    //     vehicle.vinNumber = this.vin_number;
    //     vehicle.manufactured_date = this.manufactured_date;
    //     return vehicle;
    // }
}