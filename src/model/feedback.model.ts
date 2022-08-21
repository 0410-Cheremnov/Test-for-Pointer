import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id?:string;

    @Column()
    userName?: string;

    @Column()
    date?: string;

    @Column()
    text?: string;

    @Column()
    order?: string; 

   // @Column()
    //answer?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date; 
}
