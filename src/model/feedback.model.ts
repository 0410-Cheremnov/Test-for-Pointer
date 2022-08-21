import {
    Column,
    CreateDateColumn,
    Entity, PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Feedback {
    @PrimaryColumn()
    id?:string;

    @Column()
    userName?: string;

    @Column({type: 'timestamptz'})
    date?: Date;

    @Column()
    text?: string;

    @Column({type: 'jsonb'})
    order?: object[];

    @Column({type: 'jsonb', nullable: true})
    answer?: object[];

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date; 
}
