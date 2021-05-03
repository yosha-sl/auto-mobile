import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';

@Resolver()
export class VehicleResolver {

    constructor(private vehicleService: VehicleService) { }

    @Query()
    async allVehicles() {
        return this.vehicleService.findAll();
    }

    @Query()
    async vehicleById(@Args('id', { type: () => Int }) id: number) {
        return this.vehicleService.findOne(id);
    }

    @Mutation()
    createVehicle(@Args('createVehicleInput') createVehicleInput) {
        return this.vehicleService.create(createVehicleInput);
    }

    @Mutation()
    updateVehicleById(@Args('updateVehicleInput') updateVehicleInput) {
        return this.vehicleService.update(updateVehicleInput.id, updateVehicleInput);
    }

    @Mutation()
    deleteVehicleById(@Args('id', { type: () => Int }) id: number) {
        return this.vehicleService.removeById(id);
    }


}