import { CreateVehicleInput } from './create-vehicle.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {

  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  public firstName: string;

  @Field({ nullable: true })
  public lastName: string;

  @Field({ nullable: true })
  public email: string;

  @Field({ nullable: true })
  public carMake: string;

  @Field({ nullable: true })
  public carModel: string;

  @Field({ nullable: true })
  public vinNumber: string;

  @Field({ nullable: true })
  public manufactured_date: string;

}
