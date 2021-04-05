import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Vehicle {
 
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id:number;

    @Column({ nullable: true})
    @Field({nullable:true})
    public firstName: string;

    @Column({ nullable: true})
    @Field({nullable:true})
    public lastName: string;

    @Column({ nullable: true})
    @Field({nullable:true})
    public email: string;

    @Column({ nullable: true})
    @Field({nullable:true})
    public carMake: string;

    @Column({ nullable: true})
    @Field({nullable:true})
    public carModel: string;

    @Column({ nullable: true})
    @Field({nullable:true})
    public vinNumber: string;

    @Column({ type: "date", nullable: true})
    @Field({nullable:true})
    public manufactured_date: string;
  
}
