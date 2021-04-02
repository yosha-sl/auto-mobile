import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vehicle')
export class Vehicle{
    
    @PrimaryGeneratedColumn()
    id
    @Column({type:"varchar", length: 300})
    firstName;
    @Column({type:"varchar", length: 300})
    lastName;
    @Column({type:"varchar", length: 300})
    model;   
}