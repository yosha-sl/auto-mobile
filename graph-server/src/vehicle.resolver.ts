import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { VehicleAPIService } from './vehicle-api.service';
import { VehicleService } from './vehicle.service';

@Resolver()
export class VehicleResolver {

    constructor(
        private vehicleService: VehicleService,
        private vehicleAPIService:VehicleAPIService
    ) { }

    @Query()
    async allVehicles(
        @Args('filter') filter: any,
        @Args('first') first: number,
        @Args('last') last: number,
        @Args('after') after: string,
        @Args('before') before: string,
        @Args('orderBy') orderBy: any
    ) {
        return this.vehicleService.findAll(filter, first, last, after, before, orderBy);
    }

    @Query()
    async allVehiclesByLimitAndOrder(
        @Args('first') first: number,
        @Args('last') last: number,
        @Args('after') after: string,
        @Args('before') before: string,
        @Args('orderBy') orderBy: any
    ) {

        return this.vehicleService.findAllByLimitAndOrder(first, last, after, before, orderBy);
    }

    @Query()
    async vehicleById(@Args('id', { type: () => Int }) id: number) {
        return this.vehicleAPIService.findOneBy(id);
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
