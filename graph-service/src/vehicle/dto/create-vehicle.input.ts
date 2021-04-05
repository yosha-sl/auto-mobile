import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVehicleInput {
  
    @Field({nullable:true})
    public firstName: string;

    @Field({nullable:true})
    public lastName: string;

    @Field({nullable:true})
    public email: string;

    @Field({nullable:true})
    public carMake: string;

    @Field({nullable:true})
    public carModel: string;

    @Field({nullable:true})
    public vinNumber: string;

    @Field({nullable:true})
    public manufactured_date: string;

}
